import type {
  ParsedImportData,
  ProductImportRow,
  ImportError,
} from "@/types/import.types";
import type { BrandConfig } from "@/types/brand.types";

export interface SheetContext {
  currentBrand: string | null;
  currentCategory: string | null;
  brandConfig: BrandConfig | null;
  businessRules: {
    wholesaleMinQty: number | null;
    maxDiscountMinQty: number | null;
  };
  pricingMultipliers: {
    pricePerMeter: number;
    pricePerPiece: number;
    wholesalePrice: number;
    maxDiscountPrice: number;
    factoryDiscount: number;
    taxRate: number;
  };
  currentProductDiscount: number;
}

export interface BrandParser {
  isBrandRow(row: Record<string, unknown>): boolean;
  isCategoryRow(row: Record<string, unknown>, context: SheetContext): boolean;
  isVariantRow(row: Record<string, unknown>, context: SheetContext): boolean;
  isPriceMultiplierRow(row: Record<string, unknown>): boolean;
  isProductDiscountRow(row: Record<string, unknown>): boolean;
  isBlankRow(row: Record<string, unknown>): boolean;
  extractBrandName(row: Record<string, unknown>): string;
  extractCategoryName(row: Record<string, unknown>): string;
  extractBusinessRules(row: Record<string, unknown>): {
    wholesaleMinQty: number | null;
    maxDiscountMinQty: number | null;
  };
  extractPriceMultipliers(row: Record<string, unknown>): {
    pricePerMeter: number | null;
    pricePerPiece: number | null;
    wholesalePrice: number | null;
    maxDiscountPrice: number | null;
    factoryDiscountPrice: number | null;
  };
  extractProductDiscount(row: Record<string, unknown>): number;
  parseVariantRow(
    row: Record<string, unknown>,
    rowIndex: number,
    context: SheetContext,
    supplierName: string,
  ): ProductImportRow | ImportError;
}

export abstract class BaseBrandParser implements BrandParser {
  protected normalizeColumnName(column: string): string {
    return column
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "_");
  }

  protected isNumeric(value: string): boolean {
    return !isNaN(parseFloat(value)) && isFinite(Number(value));
  }

  protected calculateProfitMargin(
    costPrice: number,
    salePrice: number,
  ): number {
    if (!costPrice || costPrice === 0) return 0;
    return ((salePrice - costPrice) / costPrice) * 100;
  }

  protected getColumnValue(
    row: Record<string, unknown>,
    columnKey: string,
    config: BrandConfig,
  ): unknown {
    const mappedColumn = config.columnMapping[columnKey];
    if (!mappedColumn) return undefined;

    for (const [key, value] of Object.entries(row)) {
      const normalizedKey = this.normalizeColumnName(key);
      if (normalizedKey === mappedColumn) {
        return value;
      }
    }
    return undefined;
  }

  abstract isBrandRow(row: Record<string, unknown>): boolean;
  abstract isCategoryRow(
    row: Record<string, unknown>,
    context: SheetContext,
  ): boolean;
  abstract isVariantRow(
    row: Record<string, unknown>,
    context: SheetContext,
  ): boolean;
  abstract isPriceMultiplierRow(row: Record<string, unknown>): boolean;
  abstract isProductDiscountRow(row: Record<string, unknown>): boolean;
  abstract isBlankRow(row: Record<string, unknown>): boolean;
  abstract extractBrandName(row: Record<string, unknown>): string;
  abstract extractCategoryName(row: Record<string, unknown>): string;
  abstract extractBusinessRules(row: Record<string, unknown>): {
    wholesaleMinQty: number | null;
    maxDiscountMinQty: number | null;
  };
  abstract extractPriceMultipliers(row: Record<string, unknown>): {
    pricePerMeter: number | null;
    pricePerPiece: number | null;
    wholesalePrice: number | null;
    maxDiscountPrice: number | null;
    factoryDiscountPrice: number | null;
  };
  abstract extractProductDiscount(row: Record<string, unknown>): number;
  abstract parseVariantRow(
    row: Record<string, unknown>,
    rowIndex: number,
    context: SheetContext,
    supplierName: string,
  ): ProductImportRow | ImportError;
}
