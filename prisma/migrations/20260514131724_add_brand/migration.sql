/*
  Warnings:

  - You are about to drop the column `maxPrice` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `purchasePrice` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `retailPrice` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `salePrice` on the `Product` table. All the data in the column will be lost.
  - Added the required column `costPrice` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pricePerPiece` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "maxPrice",
DROP COLUMN "purchasePrice",
DROP COLUMN "retailPrice",
DROP COLUMN "salePrice",
ADD COLUMN     "costPrice" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "factoryDiscountPrice" DECIMAL(10,2),
ADD COLUMN     "maxDiscountMinQty" INTEGER,
ADD COLUMN     "maxDiscountPrice" DECIMAL(10,2),
ADD COLUMN     "pricePerMeter" DECIMAL(10,2),
ADD COLUMN     "pricePerPiece" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "quantityPerPiece" DOUBLE PRECISION,
ADD COLUMN     "wholesaleMinQty" INTEGER;
