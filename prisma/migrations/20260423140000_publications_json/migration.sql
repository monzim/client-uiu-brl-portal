-- The TEXT[] default cannot be cast to jsonb automatically; swap it around the type change.
ALTER TABLE "Faculty" ALTER COLUMN "publications" DROP DEFAULT;
ALTER TABLE "Faculty" ALTER COLUMN "publications" TYPE jsonb USING to_jsonb("publications");
ALTER TABLE "Faculty" ALTER COLUMN "publications" SET DEFAULT '[]';
