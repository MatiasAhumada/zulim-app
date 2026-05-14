export interface PricingRule {
  id: string;
  name: string;
  supplierId?: string;
  brandId?: string;
  pricePerMeterMultiplier: number;
  pricePerPieceMultiplier: number;
  wholesalePriceMultiplier: number;
  maxDiscountPriceMultiplier: number;
  factoryDiscountMultiplier: number;
  taxRate: number;
  wholesaleMinQuantity?: number;
  maxDiscountMinQuantity?: number;
  isActive: boolean;
  validFrom: Date;
  validUntil?: Date;
}

export interface PricingCalculation {
  costPrice: number;
  quantityPerPiece: number;
  pricePerMeter: number;
  pricePerPiece: number;
  wholesalePrice: number;
  maxDiscountPrice: number;
  factoryDiscountPrice: number;
  profitMargin: number;
}
