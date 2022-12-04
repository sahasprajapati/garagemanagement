import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { verifyEntity } from './../common/utils/verifyEntity';
import { PageOptionsDto } from './../common/dtos/pagination/page-options.dto';
import { PageDto } from './../common/dtos/pagination/page.dto';
import { Prisma } from '@prisma/client';
import { paginate } from '@src/common/utils/paginate';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { FindAllVehicleWithSelect } from './dto/vehicle.dto';
import { CreateVehicleDto } from './dto/create-vehicle.dto';

@Injectable()
export class VehicleService {
  constructor(private prisma: PrismaService) {}
  async create(createVehicleDto: CreateVehicleDto) {
    await verifyEntity({
      model: this.prisma.vehicle,
      name: 'Vehicle',
      findCondition: {
        mobile: createVehicleDto.mobile,
      },
      throwExistError: true,
    });
    return this.prisma.vehicle.create({ data: createVehicleDto });
  }

  async findAll(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<FindAllVehicleWithSelect>> {
    // Get proper criteria using prisma findMany types
    // this.prisma.user.findMany();
    const criteria: Prisma.VehicleFindManyArgs = {
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
    const vehicles = await paginate<
      FindAllVehicleWithSelect,
      Prisma.VehicleFindManyArgs
    >(this.prisma.vehicle, criteria, pageOptionsDto);
    return vehicles;
  }

  async findOne(id: number) {
    await verifyEntity({
      model: this.prisma.vehicle,
      name: 'Vehicle',
      id,
    });
    return this.prisma.vehicle.findFirst({
      where: {
        id: id,
      },
    });
  }

  async findOneByName(name: string) {
    await verifyEntity({
      model: this.prisma.vehicle,
      name: 'Vehicle',
      findCondition: {
        name: name,
      },
    });
    return this.prisma.vehicle.findFirst({
      where: {
        name: name,
      },
    });
  }

  async update(id: number, updateVehicleDto: UpdateVehicleDto) {
    await verifyEntity({
      model: this.prisma.vehicle,
      name: 'Vehicle',
      id,
    });
    return this.prisma.vehicle.update({
      where: { id },

      data: updateVehicleDto,
    });
  }

  async remove(id: number) {
    await verifyEntity({
      model: this.prisma.vehicle,
      name: 'Vehicle',
      id,
    });
    return this.prisma.vehicle.delete({ where: { id } });
  }

  async removeMulti(ids: number[]) {
    return this.prisma.vehicle.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
