import { Service } from './service';
import { Customer } from './customer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TransactionRelations {
  @ApiProperty({ type: () => Service })
  Service: Service = undefined;

  @ApiPropertyOptional({ type: () => Customer })
  Customer?: Customer = undefined;
}
