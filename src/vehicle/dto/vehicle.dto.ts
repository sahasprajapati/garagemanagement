import { Prisma } from '@prisma/client';

// Type for FindAll Customer
const VehicleSelect = Prisma.validator<Prisma.VehicleSelect>()({
  id: true,
  name: true,
});

export type FindAllVehicleWithSelect = Prisma.CustomerGetPayload<{
  select: typeof VehicleSelect;
}>;
