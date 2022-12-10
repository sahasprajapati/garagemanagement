import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { verifyEntity } from './../common/utils/verifyEntity';
import { PageOptionsDto } from './../common/dtos/pagination/page-options.dto';
import { PageDto } from './../common/dtos/pagination/page.dto';
import { Prisma } from '@prisma/client';
import { paginate } from '@src/common/utils/paginate';
import { CreateVehicleTypeDto } from './dto/create-vehicle-type.dto';
import { FindAllVehicleTypeWithSelect } from './dto/vehicle-type.dto';
import { UpdateVehicleTypeDto } from './dto/update-vehicle-type.dto';

@Injectable()
export class VehicleTypeService {
  constructor(private prisma: PrismaService) {}
  async create(createVehicleTypeDto: CreateVehicleTypeDto) {
    await verifyEntity({
      model: this.prisma.vehicleType,
      name: 'VehicleType',
      findCondition: {
        name: createVehicleTypeDto.name,
      },
      throwExistError: true,
    });
    return this.prisma.vehicleType.create({ data: createVehicleTypeDto });
  }

  async findAll(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<FindAllVehicleTypeWithSelect>> {
    // Get proper criteria using prisma findMany types
    // this.prisma.user.findMany();
    const criteria: Prisma.VehicleTypeFindManyArgs = {
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
        vehicleWheelerType: {
          select: { name: true },
        },
      },
    };
    const vehicleTypes = await paginate<
      FindAllVehicleTypeWithSelect,
      Prisma.VehicleTypeFindManyArgs
    >(this.prisma.vehicleType, criteria, pageOptionsDto);
    return vehicleTypes;
  }

  async findOne(id: number) {
    await verifyEntity({
      model: this.prisma.vehicleType,
      name: 'VehicleType',
      id,
    });
    return this.prisma.vehicleType.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        vehicleWheelerType: {
          select: { name: true },
        },
      },
    });
  }

  async findOneByName(name: string) {
    await verifyEntity({
      model: this.prisma.vehicleType,
      name: 'VehicleType',
      findCondition: {
        name: name,
      },
    });
    return this.prisma.vehicleType.findFirst({
      where: {
        name: name,
      },
    });
  }

  async update(id: number, updateVehicleTypeDto: UpdateVehicleTypeDto) {
    await verifyEntity({
      model: this.prisma.vehicleType,
      name: 'VehicleType',
      id,
    });
    return this.prisma.vehicleType.update({
      where: { id },

      data: updateVehicleTypeDto,
    });
  }

  async remove(id: number) {
    await verifyEntity({
      model: this.prisma.vehicleType,
      name: 'VehicleType',
      id,
    });
    return this.prisma.vehicleType.delete({ where: { id } });
  }

  async removeMulti(ids: number[]) {
    return this.prisma.vehicleType.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
