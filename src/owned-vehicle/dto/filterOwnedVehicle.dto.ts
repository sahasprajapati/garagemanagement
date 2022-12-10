import { PageOptionsDto } from '@common/dtos/pagination/page-options.dto';
import { ApiProperty } from '@nestjs/swagger';

export class FilterOwnedVehicleDto extends PageOptionsDto {
  @ApiProperty({ required: false })
  customerId: string;

  @ApiProperty({ required: false })
  vehicleId: string;

  @ApiProperty({ required: false })
  makeYear: string;

  @ApiProperty({ required: false })
  color: string;

  @ApiProperty({ required: false })
  priceRangeStart: string;

  @ApiProperty({ required: false })
  priceRangeEnd: string;
}
