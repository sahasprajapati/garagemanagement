import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Permission {
  @ApiProperty({ type: Number })
  id: number = undefined;

  @ApiProperty({ type: String })
  action: string = undefined;

  @ApiPropertyOptional({ type: Object })
  condition?: object = undefined;

  @ApiProperty({ type: Date })
  createdAt: Date = undefined;

  @ApiProperty({ type: Date })
  updatedAt: Date = undefined;

  @ApiPropertyOptional({ type: Number })
  subjectId?: number = undefined;
}
