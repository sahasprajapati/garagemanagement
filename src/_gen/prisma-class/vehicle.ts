import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Vehicle {
  @ApiProperty({ type: Number })
  id: number = undefined;

  @ApiProperty({ type: String })
  name: string = undefined;

  @ApiPropertyOptional({ type: String })
  fuel?: string = undefined;

  @ApiPropertyOptional({ type: String })
  kilometerRun?: string = undefined;

  @ApiPropertyOptional({ type: String })
  engine?: string = undefined;

  @ApiPropertyOptional({ type: String })
  mileage?: string = undefined;

  @ApiPropertyOptional({ type: String })
  makeYear?: string = undefined;

  @ApiPropertyOptional({ type: String })
  transmission?: string = undefined;

  @ApiPropertyOptional({ type: String })
  color?: string = undefined;

  @ApiPropertyOptional({ type: String })
  features?: string = undefined;

  @ApiPropertyOptional({ type: String })
  price?: string = undefined;

  @ApiProperty({ type: Number })
  vehicleWheelerTypeId: number = undefined;

  @ApiProperty({ type: Number })
  vehicleTypeId: number = undefined;

  @ApiProperty({ type: Number })
  vehicleBrandId: number = undefined;

  @ApiPropertyOptional({ type: Number })
  customerId?: number = undefined;

  @ApiProperty({ type: Date })
  createdAt: Date = undefined;

  @ApiProperty({ type: Date })
  updatedAt: Date = undefined;
}
