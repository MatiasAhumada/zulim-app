import * as XLSX from "xlsx";
import { getBrandConfig } from "@/utils/brand-config.util";
import { getBrandParser } from "./parsers/parser.factory";
import type {
  ParsedImportData,
  ProductImportRow,
  ImportError,
} from "@/types/import.types";
import type { SheetContext } from "./parsers/base.parser";

export class ProductImportParser {
  public parseFileBySheets(file: Buffer): Map<string, ParsedImportData> {
    const workbook = XLSX.read(file, { type: "buffer" });
    const sheetResults = new Map<string, ParsedImportData>();

    for (const sheetName of workbook.SheetNames) {
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        defval: "",
      }) as Record<string, unknown>[];

      if (!jsonData.length) {
        continue;
      }

      const valid: ProductImportRow[] = [];
      const invalid: ImportError[] = [];
      const context: SheetContext = {
        currentBrand: null,
        currentCategory: null,
        brandConfig: null,
        businessRules: {
          wholesaleMinQty: null,
          maxDiscountMinQty: null,
        },
        pricingMultipliers: {
          pricePerMeter: 3.1,
          pricePerPiece: 2.1,
          wholesalePrice: 1.7,
          maxDiscountPrice: 1.5,
          factoryDiscount: 1.0,
          taxRate: 1.21,
        },
        currentProductDiscount: 1.0,
      };

      let brandParser = getBrandParser("DEFAULT");

      for (let i = 0; i < jsonData.length; i++) {
        const row = jsonData[i];

        if (brandParser.isBlankRow(row)) {
          context.currentCategory = null;
          context.currentProductDiscount = 1.0;
          continue;
        }

        if (brandParser.isProductDiscountRow(row)) {
          const discount = brandParser.extractProductDiscount(row);
          context.currentProductDiscount = discount;
          continue;
        }

        if (brandParser.isPriceMultiplierRow(row)) {
          const multipliers = brandParser.extractPriceMultipliers(row);
          if (multipliers.pricePerMeter)
            context.pricingMultipliers.pricePerMeter =
              multipliers.pricePerMeter;
          if (multipliers.pricePerPiece)
            context.pricingMultipliers.pricePerPiece =
              multipliers.pricePerPiece;
          if (multipliers.factoryDiscountPrice)
            context.pricingMultipliers.factoryDiscount =
              multipliers.factoryDiscountPrice;
          continue;
        }

        if (brandParser.isBrandRow(row)) {
          const brandName = brandParser.extractBrandName(row);
          context.currentBrand = brandName;
          context.brandConfig = getBrandConfig(brandName);
          context.currentCategory = null;

          brandParser = getBrandParser(brandName);

          const rules = brandParser.extractBusinessRules(row);
          context.businessRules.wholesaleMinQty =
            rules.wholesaleMinQty ||
            context.brandConfig?.businessRules?.wholesaleMinQuantity ||
            null;
          context.businessRules.maxDiscountMinQty =
            rules.maxDiscountMinQty ||
            context.brandConfig?.businessRules?.maxDiscountMinQuantity ||
            null;

          continue;
        }

        if (brandParser.isCategoryRow(row, context)) {
          context.currentCategory = brandParser.extractCategoryName(row);
          continue;
        }

        if (brandParser.isVariantRow(row, context)) {
          const result = brandParser.parseVariantRow(
            row,
            i + 2,
            context,
            sheetName,
          );

          if ("message" in result) {
            invalid.push(result);
          } else {
            valid.push(result);
          }
        }
      }

      sheetResults.set(sheetName, { valid, invalid });
    }

    return sheetResults;
  }
}
