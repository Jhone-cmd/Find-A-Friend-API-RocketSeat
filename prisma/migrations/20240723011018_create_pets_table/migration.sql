/*
  Warnings:

  - You are about to drop the column `name` on the `organizations` table. All the data in the column will be lost.
  - Added the required column `city` to the `organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `responsible_name` to the `organizations` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Age" AS ENUM ('child', 'adult');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('small', 'big');

-- CreateEnum
CREATE TYPE "Energy" AS ENUM ('low', 'average', 'high');

-- CreateEnum
CREATE TYPE "Environment" AS ENUM ('broad', 'small');

-- CreateEnum
CREATE TYPE "Independence" AS ENUM ('low', 'average', 'high');

-- AlterTable
ALTER TABLE "organizations" DROP COLUMN "name",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "responsible_name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "age" "Age" NOT NULL,
    "requirements" TEXT NOT NULL,
    "independence" "Independence" NOT NULL,
    "environment" "Environment" NOT NULL,
    "size" "Size" NOT NULL,
    "energy" "Energy" NOT NULL,
    "photos" TEXT,
    "organization_id" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
