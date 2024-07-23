/*
  Warnings:

  - Changed the type of `age` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `independence` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `environment` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `size` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `energy` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "pets" DROP COLUMN "age",
ADD COLUMN     "age" TEXT NOT NULL,
DROP COLUMN "independence",
ADD COLUMN     "independence" TEXT NOT NULL,
DROP COLUMN "environment",
ADD COLUMN     "environment" TEXT NOT NULL,
DROP COLUMN "size",
ADD COLUMN     "size" TEXT NOT NULL,
DROP COLUMN "energy",
ADD COLUMN     "energy" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Age";

-- DropEnum
DROP TYPE "Energy";

-- DropEnum
DROP TYPE "Environment";

-- DropEnum
DROP TYPE "Independence";

-- DropEnum
DROP TYPE "Size";
