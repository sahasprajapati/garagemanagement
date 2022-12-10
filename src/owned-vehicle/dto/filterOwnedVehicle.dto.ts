import { ApiProperty } from '@nestjs/swagger';

export class FilterOwnedVehicleDto {
  @ApiProperty({ required: false })
  customerId: string;
}
