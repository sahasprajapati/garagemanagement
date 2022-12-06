import { ServiceOffered } from '.pnpm/@prisma+client@4.7.1_prisma@4.7.1/node_modules/@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Service {
  @ApiProperty({ type: Number })
  id: number = undefined;

  @ApiProperty({ type: Number })
  customerId: number = undefined;

  @ApiProperty({ type: Number })
  vehicleId: number = undefined;

  @ApiPropertyOptional({ type: Number })
  staffId?: number = undefined;

  @ApiProperty({ type: Date })
  createdAt: Date = undefined;

  @ApiProperty({ type: Date })
  updatedAt: Date = undefined;

  @ApiProperty({ enum: ServiceOffered, enumName: 'ServiceOffered' })
  serviceName: ServiceOffered = undefined;
}
