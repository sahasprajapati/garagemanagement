import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateOwnedVehicleDto } from './dto/create-owned-vehicle.dto';
import { UpdateOwnedVehicleDto } from './dto/update-owned-vehicle.dto';
import { PageOptionsDto } from './../common/dtos/pagination/page-options.dto';
import { PageDto } from './../common/dtos/pagination/page.dto';
import { OwnedVehicle } from '@gen/prisma-class/owned_vehicle';
import { Prisma } from '@prisma/client';
import { paginate } from '@src/common/utils/paginate';
import { FindAllOwnedVehicleWithSelect } from './dto/owned-vehicle.dto';
import { verifyEntity } from './../common/utils/verifyEntity';

@Injectable()
export class OwnedVehicleService {
  constructor(private prisma: PrismaService) {}

  async create(createOwnedVehicleDto: CreateOwnedVehicleDto) {
    return await this.prisma.ownedVehicle.create({
      data: createOwnedVehicleDto,
    });
  }

  async findAll(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<OwnedVehicle>> {
    const criteria: Prisma.OwnedVehicleFindManyArgs = {
      skip: pageOptionsDto.skip,
      take: pageOptionsDto.take,
      orderBy: {
        createdAt: pageOptionsDto.order,
      },

      select: {
        id: true,
        kilometerRun: true,
        makeYear: true,
        color: true,
        price: true,
        numberPlate: true,
        vehicle: {
          select: { name: true },
        },
        // brand: {
        //   select: { name: true },
        // },
        // type: {
        //   select: { name: true },
        // },
        // wheelerType: {
        //   select: { name: true },
        // },
        customer: {
          select: { name: true },
        },
      },
    };
    const ownedVehicles = await paginate<
      FindAllOwnedVehicleWithSelect,
      Prisma.OwnedVehicleFindManyArgs
    >(this.prisma.ownedVehicle, criteria, pageOptionsDto);
    return ownedVehicles;
  }

  async findOne(id: number) {
    await verifyEntity({
      model: this.prisma.ownedVehicle,
      name: 'Owned Vehicle',
      id,
    });
    return this.prisma.ownedVehicle.findFirst({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateOwnedVehicleDto: UpdateOwnedVehicleDto) {
    await verifyEntity({
      model: this.prisma.ownedVehicle,
      name: 'Owned Vehicle',
      id,
    });
    return this.prisma.ownedVehicle.update({
      where: { id },

      data: updateOwnedVehicleDto,
    });
  }

  async remove(id: number) {
    await verifyEntity({
      model: this.prisma.ownedVehicle,
      name: 'Owned Vehicle',
      id,
    });
    return this.prisma.ownedVehicle.delete({ where: { id } });
  }
}
