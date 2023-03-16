/*
  Warnings:

  - You are about to drop the column `axis_of_knowledge_id` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the `axes_of_knowledge` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "courses" DROP CONSTRAINT "courses_axis_of_knowledge_id_fkey";

-- AlterTable
ALTER TABLE "courses" DROP COLUMN "axis_of_knowledge_id",
ADD COLUMN     "axes_of_knowledge" TEXT[];

-- DropTable
DROP TABLE "axes_of_knowledge";
