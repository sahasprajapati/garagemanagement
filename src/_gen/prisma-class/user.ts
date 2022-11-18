import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class User {
  @ApiProperty({ type: Number })
  id: number = undefined;

  @ApiProperty({ type: String })
  email: string = undefined;

  @ApiPropertyOptional({ type: Number })
  roleId?: number = undefined;

  @ApiProperty({ type: String })
  password: string = undefined;

  @ApiProperty({ type: String })
  name: string = undefined;

  @ApiProperty({ type: Date })
  createdAt: Date = undefined;

  @ApiProperty({ type: Date })
  updatedAt: Date = undefined;
}
