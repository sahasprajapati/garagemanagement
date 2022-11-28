import { Customer } from './customer';
import { OwnedVehicle } from './owned_vehicle';
import { Transaction } from './transaction';
import { Staff } from './staff';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ServiceRelations {
  @ApiProperty({ type: () => Customer })
  customer: Customer = undefined;

  @ApiProperty({ type: () => OwnedVehicle })
  vehicle: OwnedVehicle = undefined;

  @ApiPropertyOptional({ type: () => Transaction })
  transaction?: Transaction = undefined;

  @ApiPropertyOptional({ type: () => Staff })
  staff?: Staff = undefined;
}
