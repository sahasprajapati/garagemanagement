import { PaymentMedium } from '.pnpm/@prisma+client@4.7.1_prisma@4.7.1/node_modules/@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Transaction {
  @ApiProperty({ type: Number })
  id: number = undefined;

  @ApiProperty({ enum: PaymentMedium, enumName: 'PaymentMedium' })
  medium: PaymentMedium = PaymentMedium.CASH;

  @ApiProperty({ type: Number })
  serviceId: number = undefined;

  @ApiPropertyOptional({ type: Number })
  customerId?: number = undefined;

  @ApiProperty({ type: Date })
  createdAt: Date = undefined;

  @ApiProperty({ type: Date })
  updatedAt: Date = undefined;
}
