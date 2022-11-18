import { ApiProperty } from '@nestjs/swagger';

export class Leave {
  @ApiProperty({ type: Number })
  id: number = undefined;

  @ApiProperty({ type: Number })
  days: number = undefined;

  @ApiProperty({ type: String })
  description: string = undefined;

  @ApiProperty({ type: Number })
  staffId: number = undefined;

  @ApiProperty({ type: Date })
  from: Date = undefined;

  @ApiProperty({ type: Date })
  to: Date = undefined;

  @ApiProperty({ type: Date })
  createdAt: Date = undefined;

  @ApiProperty({ type: Date })
  updatedAt: Date = undefined;
}
