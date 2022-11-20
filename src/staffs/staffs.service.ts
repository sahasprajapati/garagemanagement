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
import { verifyEntity } from '@common/utils/verifyEntity';
import { CreateStaffDesignationDto } from './dto/create-staff-designation.dto';
import { StaffDesignation } from '@gen/prisma-class/staff_designation';
import { UpdateStaffDesignationDto } from './dto/update-staff-designation.dto';

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

  // Staff Designation
  async createDesignation(createStaffDto: CreateStaffDesignationDto) {
    await verifyEntity({
      model: this.prisma.staffDesignation,
      name: 'Staff Designation',
      findCondition: {
        mobile: createStaffDto.name,
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
      model: this.prisma.staff,
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
