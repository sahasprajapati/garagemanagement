import { ApiProperty, PartialType } from '@nestjs/swagger';
import { AttendaceStatus } from '@prisma/client';
import { CreateStaffDto } from './create-staff.dto';

export class UpdateStaffDto extends PartialType(CreateStaffDto) {}

export class UpdateAttendanceDto {
    @ApiProperty({
        enum: AttendaceStatus,default: AttendaceStatus.ABSENT
    })
    status:AttendaceStatus;

    @ApiProperty({
        type: [Number]
    })
    ids: number[]
     
}