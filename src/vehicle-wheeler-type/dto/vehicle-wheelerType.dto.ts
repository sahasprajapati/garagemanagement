import { Prisma } from '@prisma/client';

// Type for FindAll Customer
const VehicleWheelerTypeSelect =
  Prisma.validator<Prisma.VehicleWheelerTypeSelect>()({
    id: true,
    name: true,
  });

export type FindAllVehicleWheelerTypeWithSelect = Prisma.CustomerGetPayload<{
  select: typeof VehicleWheelerTypeSelect;
}>;
