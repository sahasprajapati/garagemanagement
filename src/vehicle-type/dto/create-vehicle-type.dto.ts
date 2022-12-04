import { ApiProperty } from '@nestjs/swagger';

export class CreateVehicleTypeDto {
  @ApiProperty()
  name: string;
}
