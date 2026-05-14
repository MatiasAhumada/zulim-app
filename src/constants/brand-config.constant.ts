import type { BrandConfig } from "@/types/brand.types";

export const BRAND_CONFIGS: Record<string, BrandConfig> = {
  ABRAFIC: {
    name: "ABRAFIC",
    columnMapping: {
      sku: "art",
      categoryName: "estampadas",
      quantityPerPiece: "cant",
      pricePerMeter: "xmtr",
      pricePerPiece: "xpza",
      wholesalePrice: "xmay",
      maxDiscountPrice: "max",
      factoryDiscountPrice: "c_el_dscto",
      costPrice: "costo",
    },
    hasVariants: true,
    priceStructure: {
      hasPurchasePrice: true,
      hasRetailPrice: true,
      hasWholesalePrice: true,
      hasSalePrice: true,
      hasMaxPrice: true,
      hasFactoryDiscount: true,
    },
    businessRules: {
      wholesaleMinQuantity: 6,
      maxDiscountMinQuantity: 10,
      unitTypeIndicator: "xmtr",
    },
  },
};

export const DEFAULT_BRAND_CONFIG: BrandConfig = {
  name: "DEFAULT",
  columnMapping: {
    sku: "art",
    categoryName: "nombre",
    quantityPerPiece: "cant",
    pricePerMeter: "xmtr",
    pricePerPiece: "xpza",
    wholesalePrice: "xmay",
    costPrice: "costo",
  },
  hasVariants: true,
  priceStructure: {
    hasPurchasePrice: true,
    hasRetailPrice: true,
    hasWholesalePrice: true,
    hasSalePrice: true,
    hasMaxPrice: false,
    hasFactoryDiscount: false,
  },
};
