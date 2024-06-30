/*
  Warnings:

  - You are about to drop the column `dishes` on the `Menu` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Dish" ADD COLUMN     "menuId" INTEGER;

-- AlterTable
ALTER TABLE "Menu" DROP COLUMN "dishes";

-- AddForeignKey
ALTER TABLE "Dish" ADD CONSTRAINT "Dish_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
