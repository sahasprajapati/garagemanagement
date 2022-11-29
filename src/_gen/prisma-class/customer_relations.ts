import { Transaction } from './transaction';
import { OwnedVehicle } from './owned_vehicle';
import { Service } from './service';
import { ApiProperty } from '@nestjs/swagger';

export class CustomerRelations {
  @ApiProperty({ isArray: true, type: () => Transaction })
  transaction: Transaction[] = undefined;

  @ApiProperty({ isArray: true, type: () => OwnedVehicle })
  vehicle: OwnedVehicle[] = undefined;

  @ApiProperty({ isArray: true, type: () => Service })
  Service: Service[] = undefined;
}
