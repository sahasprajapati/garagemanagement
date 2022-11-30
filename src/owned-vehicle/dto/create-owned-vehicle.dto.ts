import { ApiProperty } from '@nestjs/swagger';

export class CreateOwnedVehicleDto {
  @ApiProperty({ required: false })
  kilometerRun: string;
  @ApiProperty({ required: false })
  makeYear: string;
  @ApiProperty({ required: false })
  color: string;
  @ApiProperty({ required: false })
  price: string;

  @ApiProperty()
  numberPlate: string;

  @ApiProperty()
  customerId: number;

  @ApiProperty()
  vehicleWheelerTypeId: number;
  @ApiProperty()
  vehicleTypeId: number;
  @ApiProperty()
  vehicleBrandId: number;
  @ApiProperty()
  vehicleId: number;
}
