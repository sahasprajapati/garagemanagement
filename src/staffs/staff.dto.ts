import { Staff } from '@gen/prisma-class/staff';
import { StaffRelations } from '@gen/prisma-class/staff_relations';
import { IntersectionType, PickType } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
// Type for FindAll User
const StaffSelect = Prisma.validator<Prisma.StaffSelect>()({
  leave: {
    take: 1,
    orderBy: {
      createdAt: 'desc',
    },
    where: {
      from: {
        lte: new Date(),
      },
      to: {
        gt: new Date(),
      },
    },
  },
  designation: true,
  attendance: {
    take: 1,
    orderBy: {
      createdAt: 'desc',
    },
  },
});

export type FindAllUserWithSelect = Prisma.StaffGetPayload<{
  select: typeof StaffSelect;
}>;

export class StaffFindAllDto extends IntersectionType(
  Staff,
  PickType(StaffRelations, ['designation', 'attendance', 'leave'] as const),
) {}
