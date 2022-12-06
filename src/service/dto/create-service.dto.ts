import { ApiProperty } from '@nestjs/swagger';
import { ServiceOffered } from '@prisma/client';
import { Transaction } from './../../_gen/prisma-class/transaction';

export class CreateServiceDto {
  @ApiProperty()
  serviceName: ServiceOffered;

  @ApiProperty()
  customerId: number;

  @ApiProperty()
  vehicleId: number;

  @ApiProperty({ required: false })
  transactionId: number;

  @ApiProperty()
  staffId: number;

  @ApiProperty()
  queueNumber: number;
}
