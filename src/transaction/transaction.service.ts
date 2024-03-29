import { PageOptionsDto } from '@common/dtos/pagination/page-options.dto';
import { verifyEntity } from '@common/utils/verifyEntity';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PageDto } from '@src/common/dtos/pagination/page.dto';
import { Prisma } from '@prisma/client';
import { FindAllTransactionWithSelect } from './dto/transaction.dto';
import { paginate } from '@common/utils/paginate';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async create(createTransactionDto: CreateTransactionDto) {
    await verifyEntity({
      model: this.prisma.transaction,
      name: 'Transaction',
      throwExistError: true,
    });
    await verifyEntity({
      model: this.prisma.service,
      name: 'Service',
      id: createTransactionDto.serviceId,
    });
    await verifyEntity({
      model: this.prisma.customer,
      name: 'Customer',
      id: createTransactionDto.customerId,
    });
    return this.prisma.transaction.create({ data: createTransactionDto });
  }

  async findAll(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<FindAllTransactionWithSelect>> {
    const criteria: Prisma.TransactionFindManyArgs = {
      skip: pageOptionsDto.skip,
      take: pageOptionsDto.take,
      orderBy: {
        createdAt: pageOptionsDto.order,
      },
      select: {
        id: true,
        medium: true,
        createdAt: true,
        updatedAt: true,
        Customer: { select: { name: true } },
        Service: { select: { serviceName: true } },
      },
    };

    const transactions = await paginate<
      FindAllTransactionWithSelect,
      Prisma.TransactionFindManyArgs
    >(this.prisma.customer, criteria, pageOptionsDto);
    return transactions;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    await verifyEntity({
      model: this.prisma.transaction,
      name: 'Transaction',
      id,
    });
    return this.prisma.transaction.update({
      where: { id },

      data: updateTransactionDto,
    });
  }

  async remove(id: number) {
    await verifyEntity({
      model: this.prisma.transaction,
      name: 'Transaction',
      id,
    });
    return this.prisma.transaction.delete({ where: { id } });
  }

  async removeMulti(ids: number[]) {
    return this.prisma.transaction.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
