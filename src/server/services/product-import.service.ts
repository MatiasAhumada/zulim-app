import { ProductRepository } from "@/server/repository/product.repository";
import { SupplierRepository } from "@/server/repository/supplier.repository";
import { BrandRepository } from "@/server/repository/brand.repository";
import { CategoryRepository } from "@/server/repository/category.repository";
import { ProductImportParser } from "@/utils/product-import.parser";
import { ERROR_MESSAGES } from "@/constants/error-messages.constant";
import { IMPORT_CONFIG } from "@/constants/import.constant";
import type { ImportResult, ImportError } from "@/types/import.types";

export class ProductImportService {
  private productRepository: ProductRepository;
  private supplierRepository: SupplierRepository;
  private brandRepository: BrandRepository;
  private categoryRepository: CategoryRepository;
  private parser: ProductImportParser;

  constructor() {
    this.productRepository = new ProductRepository();
    this.supplierRepository = new SupplierRepository();
    this.brandRepository = new BrandRepository();
    this.categoryRepository = new CategoryRepository();
    this.parser = new ProductImportParser();
  }

  async importFromFile(file: Buffer): Promise<ImportResult> {
    if (file.length > IMPORT_CONFIG.MAX_FILE_SIZE) {
      throw new Error("Archivo demasiado grande");
    }

    const sheetResults = this.parser.parseFileBySheets(file);
    const allValid = [];
    const allInvalid: ImportError[] = [];

    for (const [sheetName, parsed] of sheetResults) {
      allValid.push(...parsed.valid);
      allInvalid.push(
        ...parsed.invalid.map((err) => ({
          ...err,
          message: `[${sheetName}] ${err.message}`,
        })),
      );
    }

    if (!allValid.length) {
      return {
        success: false,
        imported: 0,
        failed: allInvalid.length,
        errors: allInvalid,
      };
    }

    const skus = allValid.map((p) => p.sku);
    const duplicates = await this.productRepository.checkDuplicateSKUs(skus);

    if (duplicates.length) {
      const duplicateErrors = duplicates.map((sku) => ({
        row: 0,
        field: "sku",
        message: `${ERROR_MESSAGES.IMPORT_DUPLICATE_SKU}: ${sku}`,
      }));

      return {
        success: false,
        imported: 0,
        failed: allInvalid.length + duplicates.length,
        errors: [...allInvalid, ...duplicateErrors],
      };
    }

    const supplierNames = [...new Set(allValid.map((p) => p.supplierName))];
    const suppliers = await this.supplierRepository.bulkUpsert(supplierNames);
    const supplierIdMap = new Map(suppliers.map((s) => [s.name, s.id]));

    const brandData = allValid.map((p) => ({
      name: p.brandName,
      supplierId: supplierIdMap.get(p.supplierName)!,
    }));
    const uniqueBrands = Array.from(
      new Map(brandData.map((b) => [`${b.name}|${b.supplierId}`, b])).values(),
    );
    const brands = await this.brandRepository.bulkUpsert(uniqueBrands);
    const brandIdMap = new Map(
      brands.map((b) => [`${b.name}|${b.supplierId}`, b.id]),
    );

    const categoryData = allValid.map((p) => {
      const brandKey = `${p.brandName}|${supplierIdMap.get(p.supplierName)!}`;
      return {
        name: p.categoryName,
        brandId: brandIdMap.get(brandKey)!,
      };
    });
    const uniqueCategories = Array.from(
      new Map(categoryData.map((c) => [`${c.name}|${c.brandId}`, c])).values(),
    );
    const categories =
      await this.categoryRepository.bulkUpsert(uniqueCategories);
    const categoryIdMap = new Map(
      categories.map((c) => [`${c.name}|${c.brandId}`, c.id]),
    );

    const productCategoryMap = new Map<string, string>();
    for (const product of allValid) {
      const brandKey = `${product.brandName}|${supplierIdMap.get(product.supplierName)!}`;
      const brandId = brandIdMap.get(brandKey)!;
      const categoryKey = `${product.categoryName}|${brandId}`;
      const categoryId = categoryIdMap.get(categoryKey)!;
      productCategoryMap.set(
        `${product.brandName}|${product.categoryName}`,
        categoryId,
      );
    }

    const batches = this.createBatches(allValid, IMPORT_CONFIG.BATCH_SIZE);
    let imported = 0;

    for (const batch of batches) {
      const count = await this.productRepository.bulkCreateWithHistory(
        batch,
        productCategoryMap,
      );
      imported += count;
    }

    return {
      success: true,
      imported,
      failed: allInvalid.length,
      errors: allInvalid,
    };
  }

  private createBatches<T>(items: T[], batchSize: number): T[][] {
    const batches: T[][] = [];
    for (let i = 0; i < items.length; i += batchSize) {
      batches.push(items.slice(i, i + batchSize));
    }
    return batches;
  }
}
