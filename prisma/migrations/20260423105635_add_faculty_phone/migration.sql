/*
  Warnings:

  - Made the column `publications` on table `Faculty` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Faculty" ADD COLUMN     "phone" TEXT,
ALTER COLUMN "publications" SET NOT NULL,
ALTER COLUMN "publications" SET DEFAULT '[]';
