-- CreateTable
CREATE TABLE "PricingRule" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "supplierId" TEXT,
    "brandId" TEXT,
    "pricePerMeterMultiplier" DOUBLE PRECISION NOT NULL DEFAULT 3.1,
    "pricePerPieceMultiplier" DOUBLE PRECISION NOT NULL DEFAULT 2.1,
    "wholesalePriceMultiplier" DOUBLE PRECISION NOT NULL DEFAULT 1.7,
    "maxDiscountPriceMultiplier" DOUBLE PRECISION NOT NULL DEFAULT 1.5,
    "factoryDiscountMultiplier" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "taxRate" DOUBLE PRECISION NOT NULL DEFAULT 1.21,
    "wholesaleMinQuantity" INTEGER,
    "maxDiscountMinQuantity" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "validFrom" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "validUntil" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PricingRule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PricingRule_supplierId_brandId_name_key" ON "PricingRule"("supplierId", "brandId", "name");

-- AddForeignKey
ALTER TABLE "PricingRule" ADD CONSTRAINT "PricingRule_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PricingRule" ADD CONSTRAINT "PricingRule_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE SET NULL ON UPDATE CASCADE;
