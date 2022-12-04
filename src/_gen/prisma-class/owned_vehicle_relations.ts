import { Customer } from './customer';
import { VehicleBrand } from './vehicle_brand';
import { Vehicle } from './vehicle';
import { VehicleType } from './vehicle_type';
import { VehicleWheelerType } from './vehicle_wheeler_type';
import { Service } from './service';
import { ApiProperty } from '@nestjs/swagger';

export class OwnedVehicleRelations {
  @ApiProperty({ type: () => Customer })
  customer: Customer = undefined;

  @ApiProperty({ type: () => VehicleBrand })
  brand: VehicleBrand = undefined;

  @ApiProperty({ type: () => Vehicle })
  vehicle: Vehicle = undefined;

  @ApiProperty({ type: () => VehicleType })
  type: VehicleType = undefined;

  @ApiProperty({ type: () => VehicleWheelerType })
  wheelerType: VehicleWheelerType = undefined;

  @ApiProperty({ isArray: true, type: () => Service })
  Service: Service[] = undefined;
}
