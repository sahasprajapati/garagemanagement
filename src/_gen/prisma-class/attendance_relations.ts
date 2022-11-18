import { Staff } from './staff';
import { ApiProperty } from '@nestjs/swagger';

export class AttendanceRelations {
  @ApiProperty({ type: () => Staff })
  staff: Staff = undefined;
}
