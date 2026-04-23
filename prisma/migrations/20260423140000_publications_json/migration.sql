ALTER TABLE "Faculty" ALTER COLUMN "publications" TYPE jsonb USING to_jsonb("publications");
