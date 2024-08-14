/*
  Warnings:

  - You are about to drop the column `pet_id` on the `requirements` table. All the data in the column will be lost.
  - Added the required column `petId` to the `requirements` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "requirements" DROP CONSTRAINT "requirements_pet_id_fkey";

-- AlterTable
ALTER TABLE "requirements" DROP COLUMN "pet_id",
ADD COLUMN     "petId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "requirements" ADD CONSTRAINT "requirements_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
