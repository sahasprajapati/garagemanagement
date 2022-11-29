import { ApiProperty } from "@nestjs/swagger";

export class CreateStaffDesignationDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description?: string;

  @ApiProperty({
    default: 15
  })
  totalLeave: number;
}