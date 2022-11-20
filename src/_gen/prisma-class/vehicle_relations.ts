import { VehicleWheelerType } from './vehicle_wheeler_type';
import { VehicleType } from './vehicle_type';
import { VehicleBrand } from './vehicle_brand';
import { Customer } from './customer';
import { Service } from './service';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class VehicleRelations {
  @ApiProperty({ type: () => VehicleWheelerType })
  wheelerType: VehicleWheelerType = undefined;

  @ApiProperty({ type: () => VehicleType })
  type: VehicleType = undefined;

  @ApiProperty({ type: () => VehicleBrand })
  brand: VehicleBrand = undefined;

  @ApiPropertyOptional({ type: () => Customer })
  customer?: Customer = undefined;

  @ApiProperty({ isArray: true, type: () => Service })
  Service: Service[] = undefined;
}
