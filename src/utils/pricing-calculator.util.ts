import type { PricingRule, PricingCalculation } from "@/types/pricing.types";

export class PricingCalculator {
  private rule: PricingRule;

  constructor(rule: PricingRule) {
    this.rule = rule;
  }

  calculatePrices(
    costPrice: number,
    quantityPerPiece: number,
  ): PricingCalculation {
    const basePrice =
      costPrice * this.rule.factoryDiscountMultiplier * this.rule.taxRate;

    const pricePerMeter =
      quantityPerPiece > 0
        ? Math.round(
            (basePrice * this.rule.pricePerMeterMultiplier) / quantityPerPiece,
          )
        : 0;

    const pricePerPiece = Math.round(
      basePrice * this.rule.pricePerPieceMultiplier,
    );
    const wholesalePrice = Math.round(
      basePrice * this.rule.wholesalePriceMultiplier,
    );
    const maxDiscountPrice = Math.round(
      basePrice * this.rule.maxDiscountPriceMultiplier,
    );
    const factoryDiscountPrice = Math.round(
      costPrice * this.rule.factoryDiscountMultiplier,
    );

    const profitMargin =
      costPrice > 0 ? ((pricePerPiece - costPrice) / costPrice) * 100 : 0;

    return {
      costPrice,
      quantityPerPiece,
      pricePerMeter,
      pricePerPiece,
      wholesalePrice,
      maxDiscountPrice,
      factoryDiscountPrice,
      profitMargin,
    };
  }

  static createFromMultipliers(
    pricePerMeterMultiplier: number,
    pricePerPieceMultiplier: number,
    wholesalePriceMultiplier: number,
    maxDiscountPriceMultiplier: number,
    factoryDiscountMultiplier: number,
    taxRate: number = 1.21,
  ): PricingCalculator {
    const rule: PricingRule = {
      id: "temp",
      name: "Temporal",
      pricePerMeterMultiplier,
      pricePerPieceMultiplier,
      wholesalePriceMultiplier,
      maxDiscountPriceMultiplier,
      factoryDiscountMultiplier,
      taxRate,
      isActive: true,
      validFrom: new Date(),
    };

    return new PricingCalculator(rule);
  }
}

export const DEFAULT_ABRAFIC_RULE: Omit<PricingRule, "id" | "validFrom"> = {
  name: "ABRAFIC Estándar",
  pricePerMeterMultiplier: 3.1,
  pricePerPieceMultiplier: 2.1,
  wholesalePriceMultiplier: 1.7, // FIJO para todos
  maxDiscountPriceMultiplier: 1.5, // FIJO para todos
  factoryDiscountMultiplier: 1.0,
  taxRate: 1.21,
  isActive: true,
};

export const FIXED_MULTIPLIERS = {
  WHOLESALE: 1.7,
  MAX_DISCOUNT: 1.5,
} as const;
