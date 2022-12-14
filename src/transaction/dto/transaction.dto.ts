import { Prisma } from '@prisma/client';

// Type for FindAll Customer
const TransactionSelect = Prisma.validator<Prisma.TransactionSelect>()({
  id: true,
  medium: true,
  createdAt: true,
  updatedAt: true,
  Customer: { select: { name: true } },
  Service: { select: { serviceName: true } },
});

export type FindAllTransactionWithSelect = Prisma.TransactionGetPayload<{
  select: typeof TransactionSelect;
}>;
