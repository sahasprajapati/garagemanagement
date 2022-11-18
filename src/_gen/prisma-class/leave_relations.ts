import { Staff } from './staff';
import { ApiProperty } from '@nestjs/swagger';

export class LeaveRelations {
  @ApiProperty({ type: () => Staff })
  staff: Staff = undefined;
}
