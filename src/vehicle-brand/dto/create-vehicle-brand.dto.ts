import { ApiProperty } from '@nestjs/swagger';

export class CreateVehicleBrandDto {
  @ApiProperty()
  name: string;

  @ApiProperty({ required: false })
  vehicleWheelerTypeId: number;
}
