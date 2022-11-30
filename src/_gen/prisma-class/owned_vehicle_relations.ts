import { Customer } from './customer';
import { Service } from './service';
import { VehicleWheelerType } from './vehicle_wheeler_type';
import { VehicleType } from './vehicle_type';
import { VehicleBrand } from './vehicle_brand';
import { Vehicle } from './vehicle';
import { ApiProperty } from '@nestjs/swagger';

export class OwnedVehicleRelations {
  @ApiProperty({ type: () => Customer })
  customer: Customer = undefined;

  @ApiProperty({ isArray: true, type: () => Service })
  Service: Service[] = undefined;

  @ApiProperty({ type: () => VehicleWheelerType })
  wheelerType: VehicleWheelerType = undefined;

  @ApiProperty({ type: () => VehicleType })
  type: VehicleType = undefined;

  @ApiProperty({ type: () => VehicleBrand })
  brand: VehicleBrand = undefined;

  @ApiProperty({ type: () => Vehicle })
  vehicle: Vehicle = undefined;
}
