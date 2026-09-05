-- CreateTable
CREATE TABLE "GalleryCategory" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GalleryCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GalleryImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "caption" TEXT NOT NULL,
    "description" TEXT,
    "altText" TEXT,
    "categoryId" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "takenAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GalleryImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GallerySettings" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "heroTitle" TEXT NOT NULL DEFAULT 'Inside the Laboratory.',
    "heroSubtitle" TEXT,
    "heroImage" TEXT,
    "introText" TEXT,
    "metaTitle" TEXT NOT NULL DEFAULT 'Laboratory Gallery | UIU Biomedical Research Lab',
    "metaDescription" TEXT NOT NULL DEFAULT 'Take a virtual tour of the UIU Biomedical Research Lab and see our state-of-the-art equipment and research facilities.',
    "showCategoryFilter" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GallerySettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GalleryCategory_slug_key" ON "GalleryCategory"("slug");

-- CreateIndex
CREATE INDEX "GalleryCategory_published_sortOrder_idx" ON "GalleryCategory"("published", "sortOrder");

-- CreateIndex
CREATE INDEX "GalleryImage_published_sortOrder_createdAt_idx" ON "GalleryImage"("published", "sortOrder", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "GalleryImage_categoryId_sortOrder_idx" ON "GalleryImage"("categoryId", "sortOrder");

-- AddForeignKey
ALTER TABLE "GalleryImage" ADD CONSTRAINT "GalleryImage_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "GalleryCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
