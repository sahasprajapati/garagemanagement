import { ApiProperty } from '@nestjs/swagger';

export class CreateVehicleWheelerTypeDto {
  @ApiProperty()
  name: string;
}
