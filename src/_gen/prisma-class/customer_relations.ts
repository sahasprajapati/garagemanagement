import { OwnedVehicle } from './owned_vehicle';
import { Service } from './service';
import { Transaction } from './transaction';
import { ApiProperty } from '@nestjs/swagger';

export class CustomerRelations {
  @ApiProperty({ isArray: true, type: () => OwnedVehicle })
  vehicle: OwnedVehicle[] = undefined;

  @ApiProperty({ isArray: true, type: () => Service })
  Service: Service[] = undefined;

  @ApiProperty({ isArray: true, type: () => Transaction })
  transaction: Transaction[] = undefined;
}
