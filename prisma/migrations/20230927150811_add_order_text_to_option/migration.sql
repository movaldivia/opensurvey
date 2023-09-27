/*
  Warnings:

  - Added the required column `optionText` to the `Option` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Option" ADD COLUMN     "optionText" TEXT NOT NULL;
