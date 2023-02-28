/*
  Warnings:

  - You are about to drop the `_CourseToMinister` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CourseToMinister" DROP CONSTRAINT "_CourseToMinister_A_fkey";

-- DropForeignKey
ALTER TABLE "_CourseToMinister" DROP CONSTRAINT "_CourseToMinister_B_fkey";

-- DropTable
DROP TABLE "_CourseToMinister";

-- CreateTable
CREATE TABLE "course_minister" (
    "id" TEXT NOT NULL,
    "minister_id" TEXT,
    "course_id" TEXT,

    CONSTRAINT "course_minister_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "course_minister_minister_id_course_id_key" ON "course_minister"("minister_id", "course_id");

-- AddForeignKey
ALTER TABLE "course_minister" ADD CONSTRAINT "course_minister_minister_id_fkey" FOREIGN KEY ("minister_id") REFERENCES "ministers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_minister" ADD CONSTRAINT "course_minister_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
