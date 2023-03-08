/*
  Warnings:

  - You are about to drop the column `is_public_agent` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `office` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "is_public_agent",
DROP COLUMN "office";
