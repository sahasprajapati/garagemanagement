import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Vehicle {
  @ApiProperty({ type: Number })
  id: number = undefined;

  @ApiProperty({ type: String })
  name: string = undefined;

  @ApiPropertyOptional({ type: String })
  fuel?: string = undefined;

  @ApiPropertyOptional({ type: String })
  engine?: string = undefined;

  @ApiPropertyOptional({ type: String })
  mileage?: string = undefined;

  @ApiPropertyOptional({ type: String })
  transmission?: string = undefined;

  @ApiPropertyOptional({ type: String })
  features?: string = undefined;

  @ApiProperty({ type: Date })
  createdAt: Date = undefined;

  @ApiProperty({ type: Date })
  updatedAt: Date = undefined;
}
