/*
  Warnings:

  - You are about to drop the column `has_physical_disability` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `have_hearing_impairment` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `have_visual_impairment` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "has_physical_disability",
DROP COLUMN "have_hearing_impairment",
DROP COLUMN "have_visual_impairment",
ADD COLUMN     "have_hearing_disability" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "have_intellectual_disability" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "have_physical_disability" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "have_psychosocial_disability" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "have_visual_disability" BOOLEAN NOT NULL DEFAULT false;
