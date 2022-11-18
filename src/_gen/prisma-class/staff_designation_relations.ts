import { Staff } from './staff';
import { ApiProperty } from '@nestjs/swagger';

export class StaffDesignationRelations {
  @ApiProperty({ isArray: true, type: () => Staff })
  staff: Staff[] = undefined;
}
