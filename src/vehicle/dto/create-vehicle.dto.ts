import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateVehicleDto {
  @ApiProperty()
  name: string;

  @ApiProperty({ required: false })
  fuel: string;
  @ApiProperty({ required: false })
  engine: string;
  @ApiProperty({ required: false })
  mileage: string;
  @ApiProperty({ required: false })
  transmission: string;
  @ApiProperty({ required: false })
  features: string;

  @Transform(
    (value) => {
      return parseInt(value.value, 10);
    },
    { toClassOnly: true },
  )
  @ApiProperty({ required: true })
  vehicleTypeId: number;

  @Transform(
    (value) => {
      return parseInt(value.value, 10);
    },
    { toClassOnly: true },
  )
  @ApiProperty({ required: true })
  vehicleWheelerTypeId: number;

  @Transform(
    (value) => {
      return parseInt(value.value, 10);
    },
    { toClassOnly: true },
  )
  @ApiProperty({ required: true })
  vehicleBrandId: number;
}
