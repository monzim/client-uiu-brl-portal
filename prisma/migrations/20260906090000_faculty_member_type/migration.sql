-- CreateEnum
CREATE TYPE "MemberType" AS ENUM ('FACULTY', 'RESEARCH_ASSISTANT');

-- AlterTable
ALTER TABLE "Faculty" ADD COLUMN "memberType" "MemberType" NOT NULL DEFAULT 'FACULTY';

-- DropIndex
DROP INDEX IF EXISTS "Faculty_published_sortOrder_createdAt_idx";

-- CreateIndex
CREATE INDEX "Faculty_published_memberType_sortOrder_createdAt_idx" ON "Faculty"("published", "memberType", "sortOrder", "createdAt" DESC);
