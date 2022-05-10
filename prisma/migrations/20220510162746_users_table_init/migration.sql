/*
  Warnings:

  - Added the required column `date` to the `slots` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `slots` ADD COLUMN `date` DATE NOT NULL;
