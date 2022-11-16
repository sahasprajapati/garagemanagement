/*
  Warnings:

  - A unique constraint covering the columns `[action,objectId]` on the table `Permission` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Permission_action_objectId_key" ON "Permission"("action", "objectId");
