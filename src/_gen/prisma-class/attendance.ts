import { ApiProperty } from '@nestjs/swagger';
import { AttendaceStatus } from '@prisma/client';

export class Attendance {
  @ApiProperty({ type: Number })
  id: number = undefined;

  @ApiProperty({ type: Number })
  staffId: number = undefined;

  @ApiProperty({ enum: AttendaceStatus, enumName: 'AttendaceStatus' })
  status: AttendaceStatus = AttendaceStatus.ABSENT;

  @ApiProperty({ type: Date })
  createdAt: Date = undefined;

  @ApiProperty({ type: Date })
  updatedAt: Date = undefined;
}
