/*
  Warnings:

  - You are about to drop the column `color` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `kilometerRun` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `makeYear` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleBrandId` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleTypeId` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleWheelerTypeId` on the `Vehicle` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_vehicleId_fkey";

-- DropForeignKey
ALTER TABLE "Vehicle" DROP CONSTRAINT "Vehicle_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Vehicle" DROP CONSTRAINT "Vehicle_vehicleBrandId_fkey";

-- DropForeignKey
ALTER TABLE "Vehicle" DROP CONSTRAINT "Vehicle_vehicleTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Vehicle" DROP CONSTRAINT "Vehicle_vehicleWheelerTypeId_fkey";

-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "color",
DROP COLUMN "customerId",
DROP COLUMN "kilometerRun",
DROP COLUMN "makeYear",
DROP COLUMN "price",
DROP COLUMN "vehicleBrandId",
DROP COLUMN "vehicleTypeId",
DROP COLUMN "vehicleWheelerTypeId";

-- CreateTable
CREATE TABLE "OwnedVehicle" (
    "id" SERIAL NOT NULL,
    "kilometerRun" TEXT,
    "makeYear" TEXT,
    "color" TEXT,
    "price" TEXT,
    "plate" TEXT,
    "customerId" INTEGER,
    "vehicleWheelerTypeId" INTEGER NOT NULL,
    "vehicleTypeId" INTEGER NOT NULL,
    "vehicleBrandId" INTEGER NOT NULL,
    "vehicleId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OwnedVehicle_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OwnedVehicle" ADD CONSTRAINT "OwnedVehicle_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OwnedVehicle" ADD CONSTRAINT "OwnedVehicle_vehicleWheelerTypeId_fkey" FOREIGN KEY ("vehicleWheelerTypeId") REFERENCES "VehicleWheelerType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OwnedVehicle" ADD CONSTRAINT "OwnedVehicle_vehicleTypeId_fkey" FOREIGN KEY ("vehicleTypeId") REFERENCES "VehicleType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OwnedVehicle" ADD CONSTRAINT "OwnedVehicle_vehicleBrandId_fkey" FOREIGN KEY ("vehicleBrandId") REFERENCES "VehicleBrand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OwnedVehicle" ADD CONSTRAINT "OwnedVehicle_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "OwnedVehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
