import { FindAllStaffWithSelect } from './dto/staff.dto';
import { paginate } from '@src/common/utils/paginate';
import { Prisma } from '@prisma/client';
import { PrismaService } from './../prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { PageOptionsDto } from '@src/common/dtos/pagination/page-options.dto';
import { PageDto } from '@src/common/dtos/pagination/page.dto';
import { FindAllUserWithSelect } from '@src/user/dto/user.dto';
import { Order } from '@src/common/enums/order.enum';

enum AttendaceStatus {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
  LEAVE = 'LEAVE',
}

@Injectable()
export class StaffsService {
  constructor(private prisma: PrismaService) {}

  create(createStaffDto: CreateStaffDto) {
    return this.prisma.staff.create({ data: createStaffDto });
  }

  // findAll() {
  //   // CRUD operations
  //   return this.prisma.staff.findMany({
  //     select: {
  //       leave: {
  //         take: 1,
  //         orderBy: {
  //           createdAt: 'desc',
  //         },
  //         where: {
  //           from: {
  //             lte: new Date(),
  //           },
  //           to: {
  //             gt: new Date(),
  //           },
  //         },
  //       },
  //       designation: true,
  //       attendance: {
  //         take: 1,
  //         orderBy: {
  //           createdAt: 'desc',
  //         },
  //       },
  //     },
  //   });
  // }
  async findAll(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<FindAllStaffWithSelect>> {
    // Get proper criteria using prisma findMany types
    // this.prisma.user.findMany();
    const criteria: Prisma.StaffFindManyArgs = {
      where: {
        name: {
          ...(pageOptionsDto.filter ? { search: pageOptionsDto.filter } : {}),
        },
      },
      skip: pageOptionsDto.skip,
      take: pageOptionsDto.take,
      orderBy: {
        createdAt: pageOptionsDto.order,
      },
      select: {
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
            createdAt: Order.DESC,
          },
        },
      },
    };
    const staffs = await paginate<
      FindAllStaffWithSelect,
      Prisma.StaffFindManyArgs
    >(this.prisma.staff, criteria, pageOptionsDto);
    return staffs;
  }

  findOne(id: number) {
    return this.prisma.staff.findFirst({
      where: {
        id: id,
      },
    });
  }

  findOneByName(name: string) {
    return this.prisma.staff.findFirst({
      where: {
        name: name,
      },
    });
  }

  update(id: number, updatestaffDto: UpdateStaffDto) {
    return this.prisma.staff.update({
      where: { id },

      data: updatestaffDto,
    });
  }

  remove(id: number) {
    return this.prisma.staff.delete({ where: { id } });
  }

  async staffAttendance(
    attendance: { staffId: number; status: AttendaceStatus }[],
  ) {
    const updateAttendance = await this.prisma.attendance.createMany({
      data: attendance,
      skipDuplicates: true,
    });

    return updateAttendance;
  }

  async applyLeave(createLeaveDto: CreateLeaveDto) {
    const newLeave = await this.prisma.leave.create({
      data: {
        staffId: createLeaveDto.staffId,
        description: createLeaveDto.description,
        from: createLeaveDto.from,
        to: createLeaveDto.to,
        days: createLeaveDto.days,
      },
    });
    return newLeave;
  }

  async staffsOnLeave() {
    const now = new Date();
    const staffs = await this.prisma.staff.findMany({
      where: {
        leave: {
          some: {
            from: {
              lte: new Date(),
            },
            to: {
              gt: new Date(),
            },
          },
        },
      },
    });

    return staffs;
  }
}
