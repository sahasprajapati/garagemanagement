import { Prisma } from '@prisma/client';

// Type for FindAll Customer
const VehicleBrandSelect = Prisma.validator<Prisma.VehicleBrandSelect>()({
  id: true,
  name: true,
  vehicleWheelerType: {
    select: { name: true },
  },
});

export type FindAllVehicleBrandWithSelect = Prisma.CustomerGetPayload<{
  select: typeof VehicleBrandSelect;
}>;
