import { Transaction } from './transaction';
import { Vehicle } from './vehicle';
import { Service } from './service';
import { ApiProperty } from '@nestjs/swagger';

export class CustomerRelations {
  @ApiProperty({ isArray: true, type: () => Transaction })
  transaction: Transaction[] = undefined;

  @ApiProperty({ isArray: true, type: () => Vehicle })
  Vehicle: Vehicle[] = undefined;

  @ApiProperty({ isArray: true, type: () => Service })
  Service: Service[] = undefined;
}
