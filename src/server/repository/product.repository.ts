import { prisma } from "@/lib/prisma";
import type { ProductImportRow } from "@/types/import.types";
import { Prisma } from "@prisma/client";

export class ProductRepository {
  async bulkCreate(
    products: ProductImportRow[],
    categoryIdMap: Map<string, string>,
  ): Promise<number> {
    const result = await prisma.product.createMany({
      data: products.map((p) => {
        const categoryKey = `${p.brandName}|${p.categoryName}`;
        const categoryId = categoryIdMap.get(categoryKey);
        if (!categoryId) {
          throw new Error(`Categoría no encontrada: ${categoryKey}`);
        }
        return {
          name: p.variantName,
          sku: p.sku,
          description: p.description,
          unitType: p.unitType,
          categoryId,
          quantityPerPiece: p.quantityPerPiece,
          minSaleQuantity: 1,
          maxSaleQuantity: null,
          pricePerMeter: p.pricePerMeter
            ? new Prisma.Decimal(p.pricePerMeter)
            : null,
          pricePerPiece: new Prisma.Decimal(p.pricePerPiece),
          wholesalePrice: new Prisma.Decimal(p.wholesalePrice),
          maxDiscountPrice: p.maxDiscountPrice
            ? new Prisma.Decimal(p.maxDiscountPrice)
            : null,
          factoryDiscountPrice: p.factoryDiscountPrice
            ? new Prisma.Decimal(p.factoryDiscountPrice)
            : null,
          costPrice: new Prisma.Decimal(p.costPrice),
          wholesaleMinQty: p.wholesaleMinQuantity || null,
          maxDiscountMinQty: p.maxDiscountMinQuantity || null,
          profitMargin: p.profitMargin,
          stock: 0,
        };
      }),
      skipDuplicates: true,
    });

    return result.count;
  }

  async checkDuplicateSKUs(skus: string[]): Promise<string[]> {
    const existing = await prisma.product.findMany({
      where: { sku: { in: skus } },
      select: { sku: true },
    });

    return existing.map((p) => p.sku);
  }

  async bulkCreateWithHistory(
    products: ProductImportRow[],
    categoryIdMap: Map<string, string>,
  ): Promise<number> {
    return await prisma.$transaction(async (tx) => {
      const createdProducts = await tx.product.createMany({
        data: products.map((p) => {
          const categoryKey = `${p.brandName}|${p.categoryName}`;
          const categoryId = categoryIdMap.get(categoryKey);
          if (!categoryId) {
            throw new Error(`Categoría no encontrada: ${categoryKey}`);
          }
          return {
            name: p.variantName,
            sku: p.sku,
            description: p.description,
            unitType: p.unitType,
            categoryId,
            quantityPerPiece: p.quantityPerPiece,
            minSaleQuantity: 1,
            maxSaleQuantity: null,
            pricePerMeter: p.pricePerMeter
              ? new Prisma.Decimal(p.pricePerMeter)
              : null,
            pricePerPiece: new Prisma.Decimal(p.pricePerPiece),
            wholesalePrice: new Prisma.Decimal(p.wholesalePrice),
            maxDiscountPrice: p.maxDiscountPrice
              ? new Prisma.Decimal(p.maxDiscountPrice)
              : null,
            factoryDiscountPrice: p.factoryDiscountPrice
              ? new Prisma.Decimal(p.factoryDiscountPrice)
              : null,
            costPrice: new Prisma.Decimal(p.costPrice),
            wholesaleMinQty: p.wholesaleMinQuantity || null,
            maxDiscountMinQty: p.maxDiscountMinQuantity || null,
            profitMargin: p.profitMargin,
            stock: 0,
          };
        }),
        skipDuplicates: true,
      });

      const insertedProducts = await tx.product.findMany({
        where: { sku: { in: products.map((p) => p.sku) } },
        select: { id: true, sku: true, costPrice: true, pricePerPiece: true },
      });

      const historyRecords = insertedProducts.map((product) => {
        return {
          productId: product.id,
          oldPurchasePrice: new Prisma.Decimal(0),
          newPurchasePrice: product.costPrice,
          oldSalePrice: new Prisma.Decimal(0),
          newSalePrice: product.pricePerPiece,
          reason: "Carga Masiva Excel",
        };
      });

      await tx.priceHistory.createMany({
        data: historyRecords,
      });

      return createdProducts.count;
    });
  }
}
