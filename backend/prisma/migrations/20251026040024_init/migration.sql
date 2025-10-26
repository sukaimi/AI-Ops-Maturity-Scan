-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "aiReadinessScore" REAL NOT NULL,
    "automationGapPercent" REAL NOT NULL,
    "roiPotentialPercent" REAL NOT NULL,
    "dealPriority" REAL NOT NULL,
    "decisionPower" INTEGER NOT NULL,
    "timeline" INTEGER NOT NULL,
    "costOfPain" INTEGER NOT NULL,
    "answers" TEXT NOT NULL,
    "reportSnippet" TEXT DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "Lead_dealPriority_idx" ON "Lead"("dealPriority");

-- CreateIndex
CREATE INDEX "Lead_createdAt_idx" ON "Lead"("createdAt");
