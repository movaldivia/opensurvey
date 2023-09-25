/*
  Warnings:

  - You are about to drop the column `responseText` on the `Answer` table. All the data in the column will be lost.
  - Added the required column `answerText` to the `Answer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Answer" DROP COLUMN "responseText",
ADD COLUMN     "answerText" TEXT NOT NULL;
