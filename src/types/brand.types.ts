export interface BrandConfig {
  name: string;
  columnMapping: Record<string, string>;
  hasVariants: boolean;
  priceStructure: PriceStructure;
  businessRules?: BusinessRules;
  customFields?: Record<string, unknown>;
}

export interface BusinessRules {
  wholesaleMinQuantity?: number;
  maxDiscountMinQuantity?: number;
  unitTypeIndicator?: string;
}

export interface PriceStructure {
  hasPurchasePrice: boolean;
  hasRetailPrice: boolean;
  hasWholesalePrice: boolean;
  hasSalePrice: boolean;
  hasMaxPrice: boolean;
  hasFactoryDiscount: boolean;
  customPriceFields?: string[];
}
