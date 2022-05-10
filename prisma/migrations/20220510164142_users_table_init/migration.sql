/*
  Warnings:

  - You are about to drop the column `date` on the `slots` table. All the data in the column will be lost.
  - You are about to alter the column `date_time` on the `slots` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `slots` DROP COLUMN `date`,
    MODIFY `date_time` DATETIME NOT NULL;
