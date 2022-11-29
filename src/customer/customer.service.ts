import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from './../prisma/prisma.service';
import { verifyEntity } from './../common/utils/verifyEntity';
import { PageOptionsDto } from './../common/dtos/pagination/page-options.dto';
import { PageDto } from './../common/dtos/pagination/page.dto';
import { FindAllCustomerWithSelect } from './dto/cutomer.dto';
import { Prisma } from '@prisma/client';
import { paginate } from '@src/common/utils/paginate';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}
  async create(createCustomerDto: CreateCustomerDto) {
    await verifyEntity({
      model: this.prisma.customer,
      name: 'Customer',
      findCondition: {
        mobile: createCustomerDto.mobile,
      },
      throwExistError: true,
    });
    return this.prisma.customer.create({ data: createCustomerDto });
  }

  async findAll(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<FindAllCustomerWithSelect>> {
    // Get proper criteria using prisma findMany types
    // this.prisma.user.findMany();
    const criteria: Prisma.CustomerFindManyArgs = {
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
        email: true,
        address: true,
        transaction: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    };
    const customers = await paginate<
      FindAllCustomerWithSelect,
      Prisma.CustomerFindManyArgs
    >(this.prisma.customer, criteria, pageOptionsDto);
    return customers;
  }

  async findOne(id: number) {
    await verifyEntity({
      model: this.prisma.customer,
      name: 'Customer',
      id,
    });
    return this.prisma.customer.findFirst({
      where: {
        id: id,
      },
    });
  }

  async findOneByName(name: string) {
    await verifyEntity({
      model: this.prisma.customer,
      name: 'Customer',
      findCondition: {
        name: name,
      },
    });
    return this.prisma.customer.findFirst({
      where: {
        name: name,
      },
    });
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    await verifyEntity({
      model: this.prisma.customer,
      name: 'Customer',
      id,
    });
    return this.prisma.customer.update({
      where: { id },

      data: updateCustomerDto,
    });
  }

  async remove(id: number) {
    await verifyEntity({
      model: this.prisma.customer,
      name: 'Customer',
      id,
    });
    return this.prisma.customer.delete({ where: { id } });
  }

  async removeMulti(ids: number[]) {
    return this.prisma.customer.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
