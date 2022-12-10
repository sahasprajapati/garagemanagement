import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { verifyEntity } from './../common/utils/verifyEntity';
import { PageOptionsDto } from './../common/dtos/pagination/page-options.dto';
import { PageDto } from './../common/dtos/pagination/page.dto';
import { Prisma } from '@prisma/client';
import { paginate } from '@src/common/utils/paginate';
import { CreateVehicleBrandDto } from './dto/create-vehicle-brand.dto';
import { UpdateVehicleBrandDto } from './dto/update-vehicle-brand.dto';
import { FindAllVehicleBrandWithSelect } from './dto/vehicle-brand.dto';

@Injectable()
export class VehicleBrandService {
  constructor(private prisma: PrismaService) {}
  async create(createVehicleBrandDto: CreateVehicleBrandDto) {
    await verifyEntity({
      model: this.prisma.vehicleBrand,
      name: 'VehicleBrand',
      findCondition: {
        name: createVehicleBrandDto.name,
      },
      throwExistError: true,
    });
    return this.prisma.vehicleBrand.create({ data: createVehicleBrandDto });
  }

  async findAll(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<FindAllVehicleBrandWithSelect>> {
    // Get proper criteria using prisma findMany types
    // this.prisma.user.findMany();
    const criteria: Prisma.VehicleBrandFindManyArgs = {
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
    const vehicleBrands = await paginate<
      FindAllVehicleBrandWithSelect,
      Prisma.VehicleBrandFindManyArgs
    >(this.prisma.vehicleBrand, criteria, pageOptionsDto);
    return vehicleBrands;
  }

  async findOne(id: number) {
    await verifyEntity({
      model: this.prisma.vehicleBrand,
      name: 'VehicleBrand',
      id,
    });
    return this.prisma.vehicleBrand.findFirst({
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
      model: this.prisma.vehicleBrand,
      name: 'VehicleBrand',
      findCondition: {
        name: name,
      },
    });
    return this.prisma.vehicleBrand.findFirst({
      where: {
        name: name,
      },
    });
  }

  async update(id: number, updateVehicleBrandDto: UpdateVehicleBrandDto) {
    await verifyEntity({
      model: this.prisma.vehicleBrand,
      name: 'VehicleBrand',
      id,
    });
    return this.prisma.vehicleBrand.update({
      where: { id },

      data: updateVehicleBrandDto,
    });
  }

  async remove(id: number) {
    await verifyEntity({
      model: this.prisma.vehicleBrand,
      name: 'VehicleBrand',
      id,
    });
    return this.prisma.vehicleBrand.delete({ where: { id } });
  }

  async removeMulti(ids: number[]) {
    return this.prisma.vehicleBrand.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
