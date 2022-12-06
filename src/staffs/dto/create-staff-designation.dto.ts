import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateStaffDesignationDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description?: string;

  @Transform(
    (value) => {
      return parseInt(value.value, 10);
    },
    { toClassOnly: true },
  )
  @ApiProperty({
    default: 15,
  })
  totalLeave: number;
}
