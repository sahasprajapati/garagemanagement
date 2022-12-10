import { Prisma } from '@prisma/client';

// Type for FindAll Customer
const VehicleSelect = Prisma.validator<Prisma.VehicleSelect>()({
  id: true,
  name: true,
  wheelerType: {
    select: { name: true },
  },
  brand: {
    select: { name: true },
  },
  type: {
    select: { name: true },
  },
});

export type FindAllVehicleWithSelect = Prisma.CustomerGetPayload<{
  select: typeof VehicleSelect;
}>;
