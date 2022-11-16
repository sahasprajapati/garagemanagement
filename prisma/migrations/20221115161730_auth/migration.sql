/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Object` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Permission" ALTER COLUMN "condition" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Object_name_key" ON "Object"("name");
