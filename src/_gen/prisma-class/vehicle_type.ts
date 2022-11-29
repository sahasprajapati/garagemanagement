import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class VehicleType {
  @ApiProperty({ type: Number })
  id: number = undefined;

  @ApiProperty({ type: String })
  name: string = undefined;

  @ApiPropertyOptional({ type: Number })
  vehicleWheelerTypeId?: number = undefined;

  @ApiProperty({ type: Date })
  createdAt: Date = undefined;

  @ApiProperty({ type: Date })
  updatedAt: Date = undefined;
}
