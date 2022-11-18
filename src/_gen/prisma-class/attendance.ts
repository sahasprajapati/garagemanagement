import { AttendaceStatus } from '.pnpm/@prisma+client@4.6.1_prisma@4.6.1/node_modules/@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

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
