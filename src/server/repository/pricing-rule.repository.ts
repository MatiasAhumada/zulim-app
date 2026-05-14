import { prisma } from "@/lib/prisma";

export class PricingRuleRepository {
  async findBySupplier(supplierId: string) {
    return await prisma.pricingRule.findMany({
      where: {
        supplierId,
        isActive: true,
      },
      orderBy: {
        validFrom: "desc",
      },
    });
  }

  async findByBrand(brandId: string) {
    return await prisma.pricingRule.findMany({
      where: {
        brandId,
        isActive: true,
      },
      orderBy: {
        validFrom: "desc",
      },
    });
  }

  async findActive(supplierId?: string, brandId?: string) {
    return await prisma.pricingRule.findFirst({
      where: {
        supplierId,
        brandId,
        isActive: true,
        validFrom: {
          lte: new Date(),
        },
        OR: [{ validUntil: null }, { validUntil: { gte: new Date() } }],
      },
      orderBy: {
        validFrom: "desc",
      },
    });
  }

  async create(data: {
    name: string;
    supplierId?: string;
    brandId?: string;
    pricePerMeterMultiplier: number;
    pricePerPieceMultiplier: number;
    wholesalePriceMultiplier: number;
    maxDiscountPriceMultiplier: number;
    factoryDiscountMultiplier: number;
    taxRate?: number;
    wholesaleMinQuantity?: number;
    maxDiscountMinQuantity?: number;
  }) {
    return await prisma.pricingRule.create({
      data: {
        ...data,
        taxRate: data.taxRate || 1.21,
      },
    });
  }

  async update(
    id: string,
    data: Partial<{
      name: string;
      pricePerMeterMultiplier: number;
      pricePerPieceMultiplier: number;
      wholesalePriceMultiplier: number;
      maxDiscountPriceMultiplier: number;
      factoryDiscountMultiplier: number;
      taxRate: number;
      wholesaleMinQuantity: number;
      maxDiscountMinQuantity: number;
      isActive: boolean;
      validUntil: Date;
    }>,
  ) {
    return await prisma.pricingRule.update({
      where: { id },
      data,
    });
  }
}
