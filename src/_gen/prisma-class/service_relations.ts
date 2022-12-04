import { Customer } from './customer';
import { Staff } from './staff';
import { OwnedVehicle } from './owned_vehicle';
import { Transaction } from './transaction';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ServiceRelations {
  @ApiProperty({ type: () => Customer })
  customer: Customer = undefined;

  @ApiPropertyOptional({ type: () => Staff })
  staff?: Staff = undefined;

  @ApiProperty({ type: () => OwnedVehicle })
  vehicle: OwnedVehicle = undefined;

  @ApiPropertyOptional({ type: () => Transaction })
  transaction?: Transaction = undefined;
}
