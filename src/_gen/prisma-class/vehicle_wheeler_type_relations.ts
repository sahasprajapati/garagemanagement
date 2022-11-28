import { VehicleType } from './vehicle_type';
import { VehicleBrand } from './vehicle_brand';
import { OwnedVehicle } from './owned_vehicle';
import { ApiProperty } from '@nestjs/swagger';

export class VehicleWheelerTypeRelations {
  @ApiProperty({ isArray: true, type: () => VehicleType })
  types: VehicleType[] = undefined;

  @ApiProperty({ isArray: true, type: () => VehicleBrand })
  brands: VehicleBrand[] = undefined;

  @ApiProperty({ isArray: true, type: () => OwnedVehicle })
  vehicle: OwnedVehicle[] = undefined;
}
