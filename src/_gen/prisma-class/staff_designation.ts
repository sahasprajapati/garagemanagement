import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class StaffDesignation {
  @ApiProperty({ type: Number })
  id: number = undefined;

  @ApiProperty({ type: String })
  name: string = undefined;

  @ApiPropertyOptional({ type: String })
  description?: string = undefined;

  @ApiProperty({ type: Number })
  totalLeave: number = 15;

  @ApiProperty({ type: Date })
  createdAt: Date = undefined;

  @ApiProperty({ type: Date })
  updatedAt: Date = undefined;
}
