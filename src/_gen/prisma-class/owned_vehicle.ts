import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OwnedVehicle {
  @ApiProperty({ type: Number })
  id: number = undefined;

  @ApiPropertyOptional({ type: String })
  kilometerRun?: string = undefined;

  @ApiPropertyOptional({ type: String })
  makeYear?: string = undefined;

  @ApiPropertyOptional({ type: String })
  color?: string = undefined;

  @ApiPropertyOptional({ type: String })
  price?: string = undefined;

  @ApiProperty({ type: String })
  numberPlate: string = undefined;

  @ApiProperty({ type: Number })
  customerId: number = undefined;

  @ApiProperty({ type: Number })
  vehicleWheelerTypeId: number = undefined;

  @ApiProperty({ type: Number })
  vehicleTypeId: number = undefined;

  @ApiProperty({ type: Number })
  vehicleBrandId: number = undefined;

  @ApiProperty({ type: Number })
  vehicleId: number = undefined;

  @ApiProperty({ type: Date })
  createdAt: Date = undefined;

  @ApiProperty({ type: Date })
  updatedAt: Date = undefined;
}
