import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaymentMedium } from '.pnpm/@prisma+client@4.6.1_prisma@4.6.1/node_modules/@prisma/client';

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
