import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { paginate } from '@src/common/utils/paginate';
import { PageOptionsDto } from './../common/dtos/pagination/page-options.dto';
import { PageDto } from './../common/dtos/pagination/page.dto';
import { verifyEntity } from './../common/utils/verifyEntity';
import { PrismaService } from './../prisma/prisma.service';
import { CreateVehicleWheelerTypeDto } from './dto/create-vehicle-wheeler-type.dto';
import { UpdateVehicleWheelerTypeDto } from './dto/update-vehicle-wheeler-type.dto';
import { FindAllVehicleWheelerTypeWithSelect } from './dto/vehicle-wheelerType.dto';

@Injectable()
export class VehicleWheelerTypeService {
  constructor(private prisma: PrismaService) {}

  async create(createVehicleWheelerTypeDto: CreateVehicleWheelerTypeDto) {
    await verifyEntity({
      model: this.prisma.vehicleWheelerType,
      name: 'VehicleWheelerType',
      findCondition: {
        name: createVehicleWheelerTypeDto.name,
      },
      throwExistError: true,
    });
    return this.prisma.vehicleWheelerType.create({
      data: createVehicleWheelerTypeDto,
    });
  }

  async findAll(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<FindAllVehicleWheelerTypeWithSelect>> {
    // Get proper criteria using prisma findMany types
    // this.prisma.user.findMany();
    const criteria: Prisma.VehicleWheelerTypeFindManyArgs = {
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
      },
    };
    const vehicleWheelerType = await paginate<
      FindAllVehicleWheelerTypeWithSelect,
      Prisma.VehicleWheelerTypeFindManyArgs
    >(this.prisma.vehicleWheelerType, criteria, pageOptionsDto);
    return vehicleWheelerType;
  }

  async findOne(id: number) {
    await verifyEntity({
      model: this.prisma.vehicleWheelerType,
      name: 'VehicleWheelerType',
      id,
    });
    return this.prisma.vehicleWheelerType.findFirst({
      where: {
        id: id,
      },
    });
  }

  async findOneByName(name: string) {
    await verifyEntity({
      model: this.prisma.vehicleWheelerType,
      name: 'VehicleWheelerType',
      findCondition: {
        name: name,
      },
    });
    return this.prisma.vehicleWheelerType.findFirst({
      where: {
        name: name,
      },
    });
  }

  async update(
    id: number,
    updateVehicleWheelerTypeDto: UpdateVehicleWheelerTypeDto,
  ) {
    await verifyEntity({
      model: this.prisma.vehicleWheelerType,
      name: 'VehicleWheelerType',
      id,
    });
    return this.prisma.vehicleWheelerType.update({
      where: { id },

      data: updateVehicleWheelerTypeDto,
    });
  }

  async remove(id: number) {
    await verifyEntity({
      model: this.prisma.vehicleWheelerType,
      name: 'VehicleWheelerType',
      id,
    });
    return this.prisma.vehicleWheelerType.delete({ where: { id } });
  }

  async removeMulti(ids: number[]) {
    return this.prisma.vehicleWheelerType.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
