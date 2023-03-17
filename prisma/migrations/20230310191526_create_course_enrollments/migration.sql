/*
  Warnings:

  - You are about to drop the column `created_at` on the `ministers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ministers" DROP COLUMN "created_at";

-- CreateTable
CREATE TABLE "meetings" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "start_time_in_minutes" INTEGER NOT NULL,
    "end_time_in_minutes" INTEGER NOT NULL,
    "course_id" TEXT,

    CONSTRAINT "meetings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "start_time_in_minutes" INTEGER NOT NULL,
    "end_time_in_minutes" INTEGER NOT NULL,
    "course_id" TEXT,

    CONSTRAINT "classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course_enrollments" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "course_id" TEXT,

    CONSTRAINT "course_enrollments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meeting_class_enrollments" (
    "id" TEXT NOT NULL,
    "user_was_present" BOOLEAN NOT NULL DEFAULT false,
    "user_id" TEXT,
    "meeting_id" TEXT,
    "class_id" TEXT,

    CONSTRAINT "meeting_class_enrollments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "course_enrollments_user_id_course_id_idx" ON "course_enrollments"("user_id", "course_id");

-- CreateIndex
CREATE INDEX "meeting_class_enrollments_user_id_meeting_id_class_id_idx" ON "meeting_class_enrollments"("user_id", "meeting_id", "class_id");

-- AddForeignKey
ALTER TABLE "meetings" ADD CONSTRAINT "meetings_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_enrollments" ADD CONSTRAINT "course_enrollments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_enrollments" ADD CONSTRAINT "course_enrollments_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meeting_class_enrollments" ADD CONSTRAINT "meeting_class_enrollments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meeting_class_enrollments" ADD CONSTRAINT "meeting_class_enrollments_meeting_id_fkey" FOREIGN KEY ("meeting_id") REFERENCES "meetings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meeting_class_enrollments" ADD CONSTRAINT "meeting_class_enrollments_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
