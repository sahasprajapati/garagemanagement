import { ApiProperty } from '@nestjs/swagger';

export class CreateVehicleBrandDto {
  @ApiProperty()
  name: string;
}
