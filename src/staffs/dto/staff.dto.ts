import { Prisma } from "@prisma/client";
import { Order } from "src/common/enums/order.enum";

// Type for FindAll Staff
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
  
  export type FindAllStaffWithSelect = Prisma.StaffGetPayload<{
    select: typeof StaffSelect;
  }>;
  