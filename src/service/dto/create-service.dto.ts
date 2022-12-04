import { ServiceOffered } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Transaction } from './../../_gen/prisma-class/transaction';

export class CreateServiceDto {
  @ApiProperty()
  serviceName: ServiceOffered;

  @ApiProperty()
  customerId: number;

  @ApiProperty()
  vehicleId: number;

  @ApiProperty({ required: false })
  transaction: Transaction;

  @ApiProperty()
  staffId: number;

  @ApiProperty()
  queueNumber: number;
}
