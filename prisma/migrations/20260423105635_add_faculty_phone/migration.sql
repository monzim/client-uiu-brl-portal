/*
  Warnings:

  - Made the column `publications` on table `Faculty` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
-- `publications` is TEXT[] at this point, so the empty default must be an
-- array literal ('[]' is only valid once it becomes jsonb in a later migration).
UPDATE "Faculty" SET "publications" = ARRAY[]::TEXT[] WHERE "publications" IS NULL;
ALTER TABLE "Faculty" ADD COLUMN     "phone" TEXT,
ALTER COLUMN "publications" SET NOT NULL,
ALTER COLUMN "publications" SET DEFAULT ARRAY[]::TEXT[];
