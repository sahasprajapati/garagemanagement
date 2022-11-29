import { VehicleWheelerType } from './vehicle_wheeler_type';
import { OwnedVehicle } from './owned_vehicle';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class VehicleTypeRelations {
  @ApiPropertyOptional({ type: () => VehicleWheelerType })
  vehicleWheelerType?: VehicleWheelerType = undefined;

  @ApiProperty({ isArray: true, type: () => OwnedVehicle })
  vehicle: OwnedVehicle[] = undefined;
}
