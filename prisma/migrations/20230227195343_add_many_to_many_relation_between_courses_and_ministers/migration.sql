/*
  Warnings:

  - You are about to drop the column `course_id` on the `ministers` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ministers" DROP CONSTRAINT "ministers_course_id_fkey";

-- AlterTable
ALTER TABLE "ministers" DROP COLUMN "course_id";

-- CreateTable
CREATE TABLE "_CourseToMinister" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CourseToMinister_AB_unique" ON "_CourseToMinister"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseToMinister_B_index" ON "_CourseToMinister"("B");

-- AddForeignKey
ALTER TABLE "_CourseToMinister" ADD CONSTRAINT "_CourseToMinister_A_fkey" FOREIGN KEY ("A") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToMinister" ADD CONSTRAINT "_CourseToMinister_B_fkey" FOREIGN KEY ("B") REFERENCES "ministers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
