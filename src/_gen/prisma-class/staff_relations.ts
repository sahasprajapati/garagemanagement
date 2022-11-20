import { StaffDesignation } from './staff_designation';
import { Attendance } from './attendance';
import { Leave } from './leave';
import { Service } from './service';
import { ApiProperty } from '@nestjs/swagger';

export class StaffRelations {
  @ApiProperty({ type: () => StaffDesignation })
  designation: StaffDesignation = undefined;

  @ApiProperty({ isArray: true, type: () => Attendance })
  attendance: Attendance[] = undefined;

  @ApiProperty({ isArray: true, type: () => Leave })
  leave: Leave[] = undefined;

  @ApiProperty({ isArray: true, type: () => Service })
  Service: Service[] = undefined;
}
