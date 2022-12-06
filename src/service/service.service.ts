import { verifyEntity } from '@common/utils/verifyEntity';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';

@Injectable()
export class ServiceService {
  constructor(private prisma: PrismaService) {}

  async create(createServiceDto: CreateServiceDto) {
    const queueNumber = createServiceDto.queueNumber;
    delete createServiceDto.queueNumber;
    const {
      serviceName,

      customerId,

      vehicleId,

      transactionId,

      staffId,

      ...serviceData
    } = createServiceDto;
    const service = await this.prisma.service.create({
      data: {
        serviceName: serviceName,
        customer: {
          connect: { id: customerId },
        },
        vehicle: {
          connect: { id: vehicleId },
        },
        staff: {
          connect: { id: staffId },
        },
        ...(transactionId
          ? { transaction: { connect: { id: transactionId } } }
          : {}),
      },
    });
    // console.log(service);
    return {
      data: {
        serviceToken: `${new Date().toLocaleString()}-${service.customerId}-${
          service.vehicleId
        }-queueNumber=${queueNumber}`,
      },
      message: 'Service Created!',
    };
    // return { data: service, message: 'Service Created' };
  }

  findAll() {
    return `This action returns all service`;
  }

  async findOne(id: number) {
    await verifyEntity({
      model: this.prisma.service,
      name: 'Staff',
      id,
    });
    return this.prisma.service.findFirst({
      where: {
        id: id,
      },
    });
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
