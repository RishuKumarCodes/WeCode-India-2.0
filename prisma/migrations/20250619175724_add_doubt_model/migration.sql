-- CreateTable
CREATE TABLE "Doubt" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "tags" TEXT[],
    "image_url" TEXT,
    "resolved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Doubt_pkey" PRIMARY KEY ("id")
);
