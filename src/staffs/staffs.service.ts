import { verifyEntity } from '@common/utils/verifyEntity';
import { Staff } from '@gen/prisma-class/staff';
import { StaffDesignation } from '@gen/prisma-class/staff_designation';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PageOptionsDto } from '@src/common/dtos/pagination/page-options.dto';
import { PageDto } from '@src/common/dtos/pagination/page.dto';
import { Order } from '@src/common/enums/order.enum';
import { paginate } from '@src/common/utils/paginate';
import { PrismaService } from './../prisma/prisma.service';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { CreateStaffDesignationDto } from './dto/create-staff-designation.dto';
import { CreateStaffDto } from './dto/create-staff.dto';
import { FindAllStaffWithSelect } from './dto/staff.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';
import { UpdateStaffDesignationDto } from './dto/update-staff-designation.dto';
import { UpdateAttendanceDto, UpdateStaffDto } from './dto/update-staff.dto';

enum AttendaceStatus {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
  LEAVE = 'LEAVE',
}

@Injectable()
export class StaffsService {
  constructor(private prisma: PrismaService) {}

  // Staff
  async create(createStaffDto: CreateStaffDto) {
    await verifyEntity({
      model: this.prisma.staff,
      name: 'Staff',
      findCondition: {
        mobile: createStaffDto.mobile,
      },
      throwExistError: true,
    });
    return this.prisma.staff.create({ data: createStaffDto });
  }

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
        id: true,
        name: true,
        mobile: true,

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

  async findOne(id: number) {
    await verifyEntity({
      model: this.prisma.staff,
      name: 'Staff',
      id,
    });
    return this.prisma.staff.findFirst({
      where: {
        id: id,
      },
    });
  }

  async findOneByName(name: string) {
    await verifyEntity({
      model: this.prisma.staff,
      name: 'Staff',
      findCondition: {
        name: name,
      },
    });
    return this.prisma.staff.findFirst({
      where: {
        name: name,
      },
    });
  }

  async update(id: number, updatestaffDto: UpdateStaffDto) {
    await verifyEntity({
      model: this.prisma.staff,
      name: 'Staff',
      id,
    });
    return this.prisma.staff.update({
      where: { id },

      data: updatestaffDto,
    });
  }

  async remove(id: number) {
    await verifyEntity({
      model: this.prisma.staff,
      name: 'Staff',
      id,
    });
    return this.prisma.staff.delete({ where: { id } });
  }

  async removeMulti(ids: number[]) {
    // await verifyEntity({
    //   model: this.prisma.role,
    //   name: 'Role',
    //   id,
    // });
    return this.prisma.staff.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
  async removeMultiDesignation(ids: number[]) {
    // await verifyEntity({
    //   model: this.prisma.role,
    //   name: 'Role',
    //   id,
    // });
    return this.prisma.staffDesignation.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
  // Staff Designation
  async createDesignation(createStaffDto: CreateStaffDesignationDto) {
    await verifyEntity({
      model: this.prisma.staffDesignation,
      name: 'Staff Designation',
      findCondition: {
        name: createStaffDto.name,
      },
      throwExistError: true,
    });
    return this.prisma.staffDesignation.create({ data: createStaffDto });
  }

  async findAllDesignation(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<StaffDesignation>> {
    // Get proper criteria using prisma findMany types
    // this.prisma.user.findMany();
    const criteria: Prisma.StaffDesignationFindManyArgs = {
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
    };
    const staffDesignations = await paginate<
      StaffDesignation,
      Prisma.StaffDesignationFindManyArgs
    >(this.prisma.staffDesignation, criteria, pageOptionsDto);
    return staffDesignations;
  }

  async findOneDesignation(id: number) {
    await verifyEntity({
      model: this.prisma.staffDesignation,
      name: 'Staff Designation',
      id,
    });
    return this.prisma.staffDesignation.findFirst({
      where: {
        id: id,
      },
    });
  }

  async updateDesignation(
    id: number,
    updatestaffDto: UpdateStaffDesignationDto,
  ) {
    await verifyEntity({
      model: this.prisma.staffDesignation,
      name: 'Staff Designation',
      id,
    });
    return this.prisma.staffDesignation.update({
      where: { id },

      data: updatestaffDto,
    });
  }

  async removeDesgination(id: number) {
    await verifyEntity({
      model: this.prisma.staff,
      name: 'Staff Designation',
      id,
    });
    return this.prisma.staffDesignation.delete({ where: { id } });
  }

  // async staffAttendance(
  //   attendance: { staffId: number; status: AttendaceStatus }[],
  // ) {
  //   const updateAttendance = await this.prisma.attendance.createMany({
  //     data: attendance,
  //     skipDuplicates: true,
  //   });

  //   return updateAttendance;
  // }

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


  async updateLeave(id: number, updateLeaveDto: UpdateLeaveDto) {
    await verifyEntity({
      model: this.prisma.leave,
      name: 'Leave',
      id,
    });
    return this.prisma.leave.update({
      where: { id },
      data: updateLeaveDto,
    });
  }

  async staffsOnLeave(pageOptionsDto: PageOptionsDto) {
    const criteria: Prisma.StaffFindManyArgs = {
      where: {
        name: {
          ...(pageOptionsDto.filter ? { search: pageOptionsDto.filter } : {}),
        },
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
      skip: pageOptionsDto.skip,
      take: pageOptionsDto.take,
      orderBy: {
        createdAt: pageOptionsDto.order,
      },
      select: {
        id: true,
        name: true,
        designation: true,
        leave: true,
      },
    };

    const staffs = await paginate<Staff, Prisma.StaffFindManyArgs>(
      this.prisma.staff,
      criteria,
      pageOptionsDto,
    );
    return staffs;
  }

  async findAllStaffsAttendance(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<FindAllStaffWithSelect>> {
    // Get proper criteria using prisma findMany types
    // this.prisma.user.findMany();

    const date = new Date();
    date.setUTCHours(9, 0, 0, 0);

    const startOfDay = new Date();
    startOfDay.setUTCHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setUTCHours(23, 59, 59, 999);

    const staffsAttendance = await this.prisma.staff.findMany({
      select: {
        id: true,
        leave: {
          where: {
            from: {
              lte: startOfDay,
            },
            to: {
              gte: endOfDay,
            },
          },
        },
      },
    });
    const staffAttendances = staffsAttendance.map(async (staff) => {
      await this.prisma.attendance.upsert({
        where: {
          staffId_date: {
            staffId: staff.id,
            date: date,
          },
        },
        update: {
          status: staff?.leave?.length > 0 ? 'LEAVE' : undefined,
        },
        create: {
          staffId: staff.id,
          date: date,
          status: staff?.leave?.length > 0 ? 'LEAVE' : 'ABSENT',
        },
      });
    });
    Promise.all(staffAttendances);
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
        id: true,
        name: true,
        mobile: true,

        designation: true,
        attendance: {
          where: {
            createdAt: {
              lte: endOfDay,
              gte: startOfDay,
            },
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

  async updateAttendance(updatestaffDto: UpdateAttendanceDto) {
    await Promise.all(
      updatestaffDto?.ids?.map(async (id) => {
        await verifyEntity({
          model: this.prisma.staff,
          name: 'Staff',
          id,
        });
      }),
    );

    const startOfDay = new Date();
    startOfDay.setUTCHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setUTCHours(23, 59, 59, 999);

    return this.prisma.attendance.updateMany({
      where: {
        staffId: {
          in: updatestaffDto?.ids,
        },
        createdAt: {
          lte: endOfDay,
          gte: startOfDay,
        },
      },
      data: {
        status: updatestaffDto?.status,
      },
    });
  }
}
