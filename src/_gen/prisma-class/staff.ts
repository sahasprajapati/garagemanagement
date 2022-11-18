import { ApiProperty } from '@nestjs/swagger';

export class Staff {
  @ApiProperty({ type: Number })
  id: number = undefined;

  @ApiProperty({ type: String })
  name: string = undefined;

  @ApiProperty({ type: Number })
  mobile: number = undefined;

  @ApiProperty({ type: Number })
  staffDesignationId: number = undefined;

  @ApiProperty({ type: Date })
  createdAt: Date = undefined;

  @ApiProperty({ type: Date })
  updatedAt: Date = undefined;
}
