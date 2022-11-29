import { ApiProperty } from '@nestjs/swagger';

export class CreateStaffDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  mobile: string;

  @ApiProperty()
  staffDesignationId: number;
}
