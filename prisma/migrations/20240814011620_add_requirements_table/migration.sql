/*
  Warnings:

  - You are about to drop the column `requirements` on the `pets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "pets" DROP COLUMN "requirements";

-- CreateTable
CREATE TABLE "requirements" (
    "id" TEXT NOT NULL,
    "requirement" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL,

    CONSTRAINT "requirements_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "requirements" ADD CONSTRAINT "requirements_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
