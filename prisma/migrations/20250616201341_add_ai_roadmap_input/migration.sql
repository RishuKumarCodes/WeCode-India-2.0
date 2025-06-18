-- CreateTable
CREATE TABLE "AiRoadmapInput" (
    "id" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "goal" TEXT NOT NULL,
    "skillLevel" TEXT NOT NULL,
    "months" INTEGER NOT NULL,
    "dailyHours" INTEGER NOT NULL,
    "targetCompaniesOrRoles" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "AiRoadmapInput_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AiRoadmapInput" ADD CONSTRAINT "AiRoadmapInput_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
