-- Add slug columns as nullable first
ALTER TABLE "News" ADD COLUMN "slug" TEXT;
ALTER TABLE "Faculty" ADD COLUMN "slug" TEXT;

-- Backfill existing rows using id
UPDATE "News" SET "slug" = "id" WHERE "slug" IS NULL;
UPDATE "Faculty" SET "slug" = "id" WHERE "slug" IS NULL;

-- Make NOT NULL
ALTER TABLE "News" ALTER COLUMN "slug" SET NOT NULL;
ALTER TABLE "Faculty" ALTER COLUMN "slug" SET NOT NULL;

-- Add unique indexes
CREATE UNIQUE INDEX "News_slug_key" ON "News"("slug");
CREATE UNIQUE INDEX "Faculty_slug_key" ON "Faculty"("slug");
