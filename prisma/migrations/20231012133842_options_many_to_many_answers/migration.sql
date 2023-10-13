/*
  Warnings:

  - You are about to drop the column `optionId` on the `Answer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_optionId_fkey";

-- AlterTable
ALTER TABLE "Answer" DROP COLUMN "optionId";

-- CreateTable
CREATE TABLE "_AnswerToOption" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AnswerToOption_AB_unique" ON "_AnswerToOption"("A", "B");

-- CreateIndex
CREATE INDEX "_AnswerToOption_B_index" ON "_AnswerToOption"("B");

-- AddForeignKey
ALTER TABLE "_AnswerToOption" ADD CONSTRAINT "_AnswerToOption_A_fkey" FOREIGN KEY ("A") REFERENCES "Answer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnswerToOption" ADD CONSTRAINT "_AnswerToOption_B_fkey" FOREIGN KEY ("B") REFERENCES "Option"("id") ON DELETE CASCADE ON UPDATE CASCADE;
