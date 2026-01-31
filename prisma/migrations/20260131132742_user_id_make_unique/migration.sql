/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `ProviderProfile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProviderProfile_userId_key" ON "ProviderProfile"("userId");
