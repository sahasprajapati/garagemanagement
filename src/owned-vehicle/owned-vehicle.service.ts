import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateOwnedVehicleDto } from './dto/create-owned-vehicle.dto';
import { UpdateOwnedVehicleDto } from './dto/update-owned-vehicle.dto';

@Injectable()
export class OwnedVehicleService {
  constructor(private prisma: PrismaService) {}

  async create(createOwnedVehicleDto: CreateOwnedVehicleDto) {
    return await this.prisma.ownedVehicle.create({
      data: createOwnedVehicleDto,
    });
  }

  findAll() {
    return `This action returns all ownedVehicle`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ownedVehicle`;
  }

  update(id: number, updateOwnedVehicleDto: UpdateOwnedVehicleDto) {
    return `This action updates a #${id} ownedVehicle`;
  }

  remove(id: number) {
    return `This action removes a #${id} ownedVehicle`;
  }
}
