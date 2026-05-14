import { BaseBrandParser, type SheetContext } from "./base.parser";
import { getDefaultBrandConfig } from "@/utils/brand-config.util";
import {
  PricingCalculator,
  DEFAULT_ABRAFIC_RULE,
} from "@/utils/pricing-calculator.util";
import { productImportSchema } from "@/lib/validations/product-import.validation";
import type { ProductImportRow, ImportError } from "@/types/import.types";

export class AbraficParser extends BaseBrandParser {
  private isHeaderRow(row: Record<string, unknown>): boolean {
    const values = Object.values(row).map((v) => String(v).toLowerCase());
    return values.some(
      (v) =>
        v.includes("cant") ||
        v.includes("xmtr") ||
        v.includes("xpza") ||
        v.includes("costo"),
    );
  }

  isPriceMultiplierRow(row: Record<string, unknown>): boolean {
    const values = Object.values(row).filter(
      (v) => v !== null && v !== undefined && String(v).trim() !== "",
    );

    if (values.length < 3) return false;

    const numericValues = values.filter((v) => {
      const str = String(v).replace(",", ".");
      return this.isNumeric(str) && parseFloat(str) > 0 && parseFloat(str) < 10;
    });

    return numericValues.length >= 3;
  }

  isProductDiscountRow(row: Record<string, unknown>): boolean {
    const values = Object.values(row).filter(
      (v) => v !== null && v !== undefined && String(v).trim() !== "",
    );

    if (values.length !== 1) return false;

    const firstValue = String(values[0]).replace(",", ".");
    if (!this.isNumeric(firstValue)) return false;

    const num = parseFloat(firstValue);
    return num > 0 && num <= 1;
  }

  isBlankRow(row: Record<string, unknown>): boolean {
    const values = Object.values(row);
    return values.every(
      (v) => v === null || v === undefined || String(v).trim() === "",
    );
  }

  isBrandRow(row: Record<string, unknown>): boolean {
    const firstValue = Object.values(row)[0];
    if (!firstValue) return false;

    const str = String(firstValue).trim();
    const hasDate = /\d{1,2}\/\d{1,2}\/\d{4}/.test(str);
    const hasMultipleWords = str.split(/\s+/).length >= 2;

    return hasDate || (hasMultipleWords && !this.isNumeric(str));
  }

  isCategoryRow(row: Record<string, unknown>, context: SheetContext): boolean {
    if (!context.currentBrand) return false;

    const firstValue = Object.values(row)[0];
    const secondValue = Object.values(row)[1];

    if (!firstValue) return false;

    const firstStr = String(firstValue).toLowerCase().trim();
    const secondStr = String(secondValue || "")
      .toLowerCase()
      .trim();

    const isHeaderLike =
      firstStr === "art" ||
      secondStr.includes("estampada") ||
      secondStr.includes("nombre") ||
      this.isHeaderRow(row);

    if (isHeaderLike) {
      return true;
    }

    const str = String(firstValue).trim();
    const hasSecondColumn = Boolean(
      secondValue && String(secondValue).trim() !== "",
    );

    return (
      str.length > 0 &&
      !this.isNumeric(str) &&
      !this.isHeaderRow(row) &&
      hasSecondColumn
    );
  }

  isVariantRow(row: Record<string, unknown>, context: SheetContext): boolean {
    if (!context.currentCategory) return false;

    const values = Object.values(row);
    const firstValue = String(values[0] || "").trim();
    const hasNumericData = values
      .slice(1)
      .some((v) => this.isNumeric(String(v)));

    return firstValue.length > 0 && hasNumericData;
  }

  extractBrandName(row: Record<string, unknown>): string {
    const firstValue = String(Object.values(row)[0] || "").trim();
    const parts = firstValue.split(/\s{2,}|\t/);
    const brandPart = parts[0].trim();

    const cleanBrand = brandPart
      .replace(/\d+\/\d+/g, "")
      .replace(/\d+\/\d+\/\d+/g, "")
      .trim();

    return cleanBrand;
  }

  extractCategoryName(row: Record<string, unknown>): string {
    const secondValue = Object.values(row)[1];
    if (secondValue && String(secondValue).trim() !== "") {
      return String(secondValue).trim();
    }
    return String(Object.values(row)[0] || "").trim();
  }

  extractBusinessRules(row: Record<string, unknown>): {
    wholesaleMinQty: number | null;
    maxDiscountMinQty: number | null;
  } {
    const values = Object.values(row).map((v) =>
      String(v).toLowerCase().trim(),
    );

    let wholesaleMinQty: number | null = null;
    let maxDiscountMinQty: number | null = null;

    for (const value of values) {
      const match = value.match(/(\d+)\s*o\s*\+/);
      if (match) {
        const qty = parseInt(match[1]);
        if (!wholesaleMinQty) {
          wholesaleMinQty = qty;
        } else if (!maxDiscountMinQty) {
          maxDiscountMinQty = qty;
        }
      }
    }

    return { wholesaleMinQty, maxDiscountMinQty };
  }

  extractPriceMultipliers(row: Record<string, unknown>): {
    pricePerMeter: number | null;
    pricePerPiece: number | null;
    wholesalePrice: number | null;
    maxDiscountPrice: number | null;
    factoryDiscountPrice: number | null;
  } {
    const values = Object.values(row);
    const multipliers: number[] = [];

    for (const value of values) {
      if (value !== null && value !== undefined) {
        const str = String(value).replace(",", ".").trim();
        if (this.isNumeric(str)) {
          const num = parseFloat(str);
          if (num > 0 && num < 10) {
            multipliers.push(num);
          }
        }
      }
    }

    return {
      pricePerMeter:
        multipliers[0] || DEFAULT_ABRAFIC_RULE.pricePerMeterMultiplier,
      pricePerPiece:
        multipliers[1] || DEFAULT_ABRAFIC_RULE.pricePerPieceMultiplier,
      wholesalePrice: null,
      maxDiscountPrice: null,
      factoryDiscountPrice:
        multipliers[4] || DEFAULT_ABRAFIC_RULE.factoryDiscountMultiplier,
    };
  }

  extractProductDiscount(row: Record<string, unknown>): number {
    const values = Object.values(row).filter(
      (v) => v !== null && v !== undefined && String(v).trim() !== "",
    );

    if (values.length === 0) return 1.0;

    const firstValue = String(values[0]).replace(",", ".");
    if (!this.isNumeric(firstValue)) return 1.0;

    const discount = parseFloat(firstValue);
    return discount > 0 && discount <= 1 ? discount : 1.0;
  }

  private determineUnitType(
    row: Record<string, unknown>,
  ): "KG" | "METERS" | "UNIT" {
    for (const [key] of Object.entries(row)) {
      const normalizedKey = this.normalizeColumnName(key);
      if (normalizedKey === "xmtr") {
        return "METERS";
      }
    }
    return "UNIT";
  }

  parseVariantRow(
    row: Record<string, unknown>,
    rowIndex: number,
    context: SheetContext,
    supplierName: string,
  ): ProductImportRow | ImportError {
    if (!context.currentBrand || !context.currentCategory) {
      return {
        row: rowIndex,
        message: "Variante sin marca o categoría definida",
        data: row,
      };
    }

    const config = context.brandConfig || getDefaultBrandConfig();

    const sku = String(this.getColumnValue(row, "sku", config) || "").trim();
    const categoryName = String(
      this.getColumnValue(row, "categoryName", config) ||
        context.currentCategory,
    ).trim();
    const variantName = categoryName;

    const quantityPerPiece = parseFloat(
      String(this.getColumnValue(row, "quantityPerPiece", config) || 0),
    );
    const costPrice = parseFloat(
      String(this.getColumnValue(row, "costPrice", config) || 0),
    );

    const calculator = PricingCalculator.createFromMultipliers(
      context.pricingMultipliers.pricePerMeter,
      context.pricingMultipliers.pricePerPiece,
      context.pricingMultipliers.wholesalePrice,
      context.pricingMultipliers.maxDiscountPrice,
      context.currentProductDiscount,
      context.pricingMultipliers.taxRate,
    );

    const prices = calculator.calculatePrices(costPrice, quantityPerPiece);
    const unitType = this.determineUnitType(row);

    const productData = {
      variantName,
      sku,
      categoryName: context.currentCategory,
      brandName: context.currentBrand,
      supplierName,
      quantityPerPiece: prices.quantityPerPiece,
      unitType,
      pricePerMeter: prices.pricePerMeter,
      pricePerPiece: prices.pricePerPiece,
      wholesalePrice: prices.wholesalePrice,
      maxDiscountPrice: prices.maxDiscountPrice,
      factoryDiscountPrice: prices.factoryDiscountPrice,
      costPrice: prices.costPrice,
      wholesaleMinQuantity: context.businessRules.wholesaleMinQty || undefined,
      maxDiscountMinQuantity:
        context.businessRules.maxDiscountMinQty || undefined,
      profitMargin: prices.profitMargin,
    };

    const validation = productImportSchema.safeParse(productData);

    if (!validation.success) {
      const firstError = validation.error.issues[0];
      return {
        row: rowIndex,
        field: firstError.path.join("."),
        message: firstError.message,
        data: row,
      };
    }

    return validation.data as ProductImportRow;
  }
}
