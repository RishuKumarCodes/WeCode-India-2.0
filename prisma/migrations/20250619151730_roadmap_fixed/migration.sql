/*
  Warnings:

  - You are about to drop the column `userEmail` on the `AiRoadmapInput` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `AiRoadmapInput` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AiRoadmapInput" DROP COLUMN "userEmail",
DROP COLUMN "userName";
