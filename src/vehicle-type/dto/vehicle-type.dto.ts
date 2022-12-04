import { Prisma } from '@prisma/client';

// Type for FindAll Customer
const VehicleTypeSelect = Prisma.validator<Prisma.VehicleTypeSelect>()({
  id: true,
  name: true,
});

export type FindAllVehicleTypeWithSelect = Prisma.CustomerGetPayload<{
  select: typeof VehicleTypeSelect;
}>;
