import { Prisma } from '@prisma/client';
import { Order } from '@src/common/enums/order.enum';

// Type for FindAll Role
const RoleSelect = Prisma.validator<Prisma.RoleSelect>()({
  name: true,
  rolePermissions: {
    select: {
      permission: {
        select: {
          action: true,
          condition: true,
          object: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  },
});

export type FindAllRoleWithSelect = Prisma.RoleGetPayload<{
  select: typeof RoleSelect;
}>;
