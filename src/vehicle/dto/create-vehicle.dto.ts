import { ApiProperty } from '@nestjs/swagger';

export class CreateVehicleDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  mobile: string;
  @ApiProperty({ required: false })
  email: string;
  @ApiProperty({ required: false })
  address: string;
}
