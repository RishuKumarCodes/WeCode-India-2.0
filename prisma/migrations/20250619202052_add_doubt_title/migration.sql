/*
  Warnings:

  - Added the required column `title` to the `Doubt` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Doubt" ADD COLUMN     "title" TEXT NOT NULL DEFAULT 'Untitled';
