import { Prisma } from '@prisma/client';

// Type for FindAll Customer
const CustomerSelect = Prisma.validator<Prisma.CustomerSelect>()({
  id: true,
  name: true,
  mobile: true,
  email: true,
  address: true,
  transaction: {
    orderBy: {
      createdAt: 'desc',
    },
  },
});

export type FindAllCustomerWithSelect = Prisma.CustomerGetPayload<{
  select: typeof CustomerSelect;
}>;
