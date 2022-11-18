/*
  Warnings:

  - You are about to drop the column `spent` on the `Leave` table. All the data in the column will be lost.
  - Added the required column `description` to the `Leave` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Attendance" ALTER COLUMN "status" SET DEFAULT 'ABSENT';

-- AlterTable
ALTER TABLE "Leave" DROP COLUMN "spent",
ADD COLUMN     "days" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "description" TEXT NOT NULL;
