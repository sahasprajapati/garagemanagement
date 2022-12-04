import { verifyEntity } from '@common/utils/verifyEntity';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServiceService {
  constructor(private prisma: PrismaService) {}

  async create(createServiceDto: CreateServiceDto) {
    return await this.prisma.service.create({ data: createServiceDto });
  }

  findAll() {
    return `This action returns all service`;
  }

  findOne(id: number) {
    return `This action returns a #${id} service`;
  }

  async update(id: number, updateServiceDto: any) {
    await verifyEntity({
      model: this.prisma.service,
      name: 'Service',
      id,
    });
    return this.prisma.service.update({
      where: { id },

      data: updateServiceDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
