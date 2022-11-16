/*
  Warnings:

  - A unique constraint covering the columns `[roleId,permissionId]` on the table `Role_Permission` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Role_Permission_roleId_permissionId_key" ON "Role_Permission"("roleId", "permissionId");
