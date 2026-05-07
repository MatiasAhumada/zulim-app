/*
  Warnings:

  - You are about to drop the column `cae` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `caeExpiration` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `invoiceType` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `priceAtSale` on the `SaleItem` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Sale` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `paymentMethod` on the `Sale` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `subtotal` to the `SaleItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitPrice` to the `SaleItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitType` to the `SaleItem` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('EFECTIVO', 'TRANSFERENCIA', 'DEBITO', 'CREDITO', 'MERCADOPAGO');

-- CreateEnum
CREATE TYPE "InvoiceType" AS ENUM ('A', 'B', 'C', 'TICKET');

-- AlterTable
ALTER TABLE "Sale" DROP COLUMN "cae",
DROP COLUMN "caeExpiration",
DROP COLUMN "invoiceType",
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "saleNumber" SERIAL NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "paymentMethod",
ADD COLUMN     "paymentMethod" "PaymentMethod" NOT NULL;

-- AlterTable
ALTER TABLE "SaleItem" DROP COLUMN "priceAtSale",
ADD COLUMN     "subtotal" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "unitPrice" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "unitType" "UnitType" NOT NULL;

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "saleId" TEXT NOT NULL,
    "invoiceType" "InvoiceType" NOT NULL,
    "invoiceNumber" TEXT NOT NULL,
    "cae" TEXT,
    "caeExpiration" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_saleId_key" ON "Invoice"("saleId");

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
