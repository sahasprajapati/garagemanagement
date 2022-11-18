/*
  Warnings:

  - You are about to drop the column `objectId` on the `Permission` table. All the data in the column will be lost.
  - You are about to drop the `Object` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[action,subjectId]` on the table `Permission` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Permission" DROP CONSTRAINT "Permission_objectId_fkey";

-- DropIndex
DROP INDEX "Permission_action_objectId_key";

-- AlterTable
ALTER TABLE "Permission" DROP COLUMN "objectId",
ADD COLUMN     "subjectId" INTEGER;

-- DropTable
DROP TABLE "Object";

-- CreateTable
CREATE TABLE "Subject" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subject_name_key" ON "Subject"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_action_subjectId_key" ON "Permission"("action", "subjectId");

-- AddForeignKey
ALTER TABLE "Permission" ADD CONSTRAINT "Permission_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE SET NULL ON UPDATE CASCADE;
