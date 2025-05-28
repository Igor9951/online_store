/*
  Warnings:

  - Added the required column `age` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` ADD COLUMN `age` VARCHAR(191) NOT NULL;
