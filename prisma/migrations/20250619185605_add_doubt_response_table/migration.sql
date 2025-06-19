-- CreateTable
CREATE TABLE "DoubtResponse" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "doubt_id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "image_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DoubtResponse_pkey" PRIMARY KEY ("id")
);
