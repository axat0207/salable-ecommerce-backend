/*
  Warnings:

  - You are about to drop the column `productsId` on the `Cart` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "productsId";

-- AlterTable
ALTER TABLE "CartProduct" ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1;
