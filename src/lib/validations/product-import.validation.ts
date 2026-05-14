import { z } from "zod";

const unitTypeEnum = z.enum(["KG", "METERS", "UNIT"]);

export const productImportSchema = z.object({
  variantName: z.string().min(1).max(255),
  sku: z.string().min(1).max(100),
  categoryName: z.string().min(1).max(255),
  brandName: z.string().min(1).max(255),
  supplierName: z.string().min(1).max(255),

  quantityPerPiece: z.preprocess(
    (val) => (typeof val === "string" ? parseFloat(val) : val),
    z.number().nonnegative(),
  ),
  unitType: unitTypeEnum,

  pricePerMeter: z.preprocess(
    (val) => (typeof val === "string" ? parseFloat(val) : val),
    z.number().nonnegative(),
  ),
  pricePerPiece: z.preprocess(
    (val) => (typeof val === "string" ? parseFloat(val) : val),
    z.number().nonnegative(),
  ),
  wholesalePrice: z.preprocess(
    (val) => (typeof val === "string" ? parseFloat(val) : val),
    z.number().nonnegative(),
  ),
  maxDiscountPrice: z.preprocess(
    (val) => (typeof val === "string" ? parseFloat(val) : val),
    z.number().nonnegative().optional(),
  ),
  factoryDiscountPrice: z.preprocess(
    (val) => (typeof val === "string" ? parseFloat(val) : val),
    z.number().nonnegative().optional(),
  ),
  costPrice: z.preprocess(
    (val) => (typeof val === "string" ? parseFloat(val) : val),
    z.number().nonnegative(),
  ),

  wholesaleMinQuantity: z.number().int().positive().optional(),
  maxDiscountMinQuantity: z.number().int().positive().optional(),

  profitMargin: z.preprocess(
    (val) => (typeof val === "string" ? parseFloat(val) : val),
    z.number().min(0).max(1000),
  ),
  description: z.string().max(1000).optional(),
});

export type ProductImportInput = z.infer<typeof productImportSchema>;
