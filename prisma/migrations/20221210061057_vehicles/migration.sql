/*
  Warnings:

  - You are about to drop the column `vehicleBrandId` on the `OwnedVehicle` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleTypeId` on the `OwnedVehicle` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleWheelerTypeId` on the `OwnedVehicle` table. All the data in the column will be lost.
  - Added the required column `vehicleBrandId` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vehicleTypeId` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vehicleWheelerTypeId` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OwnedVehicle" DROP CONSTRAINT "OwnedVehicle_vehicleBrandId_fkey";

-- DropForeignKey
ALTER TABLE "OwnedVehicle" DROP CONSTRAINT "OwnedVehicle_vehicleTypeId_fkey";

-- DropForeignKey
ALTER TABLE "OwnedVehicle" DROP CONSTRAINT "OwnedVehicle_vehicleWheelerTypeId_fkey";

-- AlterTable
ALTER TABLE "OwnedVehicle" DROP COLUMN "vehicleBrandId",
DROP COLUMN "vehicleTypeId",
DROP COLUMN "vehicleWheelerTypeId";

-- AlterTable
ALTER TABLE "Vehicle" ADD COLUMN     "vehicleBrandId" INTEGER NOT NULL,
ADD COLUMN     "vehicleTypeId" INTEGER NOT NULL,
ADD COLUMN     "vehicleWheelerTypeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_vehicleBrandId_fkey" FOREIGN KEY ("vehicleBrandId") REFERENCES "VehicleBrand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_vehicleTypeId_fkey" FOREIGN KEY ("vehicleTypeId") REFERENCES "VehicleType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_vehicleWheelerTypeId_fkey" FOREIGN KEY ("vehicleWheelerTypeId") REFERENCES "VehicleWheelerType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
