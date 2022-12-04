import { Customer } from './customer';
import { Service } from './service';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class TransactionRelations {
  @ApiPropertyOptional({ type: () => Customer })
  Customer?: Customer = undefined;

  @ApiProperty({ type: () => Service })
  Service: Service = undefined;
}
