import { OwnedVehicle } from './owned_vehicle';
import { ApiProperty } from '@nestjs/swagger';

export class VehicleRelations {
  @ApiProperty({ isArray: true, type: () => OwnedVehicle })
  ownedVehicle: OwnedVehicle[] = undefined;
}
