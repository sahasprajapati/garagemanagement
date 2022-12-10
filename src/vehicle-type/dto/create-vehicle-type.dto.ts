import { ApiProperty } from '@nestjs/swagger';

export class CreateVehicleTypeDto {
  @ApiProperty()
  name: string;

  @ApiProperty({ required: false })
  vehicleWheelerTypeId: number;
}
