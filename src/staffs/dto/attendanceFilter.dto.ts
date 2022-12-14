import { PageOptionsDto } from '@common/dtos/pagination/page-options.dto';
import { ApiProperty } from '@nestjs/swagger';

export class AttendanceFilterDto extends PageOptionsDto {
  @ApiProperty({ required: false })
  date: Date;
}
