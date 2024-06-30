/*
  Warnings:

  - The `dishes` column on the `Menu` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Menu" DROP COLUMN "dishes",
ADD COLUMN     "dishes" INTEGER[];
