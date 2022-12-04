import { ServiceOffered } from '....\node_modules.pnpm@prisma+client@4.6.1_prisma@4.6.1\node_modules@prismaclient';
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
