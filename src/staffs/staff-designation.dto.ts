import { Prisma } from '@prisma/client';
// Type for FindAll User
const StaffDesignationSelect =
  Prisma.validator<Prisma.StaffDesignationSelect>()({});

export type FindAllUserWithSelect = Prisma.StaffGetPayload<{
  select: typeof StaffDesignationSelect;
}>;
