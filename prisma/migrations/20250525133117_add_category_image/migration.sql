-- AlterTable
ALTER TABLE `category` ADD COLUMN `image` VARCHAR(191) NULL;

-- RenameIndex
ALTER TABLE `category` RENAME INDEX `Category_name_key` TO `category_name_key`;
