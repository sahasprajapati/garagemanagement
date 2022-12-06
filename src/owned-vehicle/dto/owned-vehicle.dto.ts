import { Prisma } from '@prisma/client';
import { Order } from 'src/common/enums/order.enum';

const OwnedVehicleSelect = Prisma.validator<Prisma.OwnedVehicleSelect>()({
  id: true,
  kilometerRun: true,
  makeYear: true,
  color: true,
  price: true,
  customerId: true,
  vehicleId: true,
  createdAt: true,
  updatedAt: true,
  numberPlate: true,
  vehicle: {
    select: { name: true },
  },
  customer: {
    select: { name: true },
  },
});

export type FindAllOwnedVehicleWithSelect = Prisma.OwnedVehicleGetPayload<{
  select: typeof OwnedVehicleSelect;
}>;
