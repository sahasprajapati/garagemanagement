import { Customer } from './customer';
import { Vehicle } from './vehicle';
import { Transaction } from './transaction';
import { Staff } from './staff';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ServiceRelations {
  @ApiProperty({ type: () => Customer })
  customer: Customer = undefined;

  @ApiProperty({ type: () => Vehicle })
  vehicle: Vehicle = undefined;

  @ApiPropertyOptional({ type: () => Transaction })
  transaction?: Transaction = undefined;

  @ApiPropertyOptional({ type: () => Staff })
  staff?: Staff = undefined;
}
