import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Customer {
  @ApiProperty({ type: Number })
  id: number = undefined;

  @ApiProperty({ type: String })
  name: string = undefined;

  @ApiProperty({ type: String })
  mobile: string = undefined;

  @ApiPropertyOptional({ type: String })
  email?: string = undefined;

  @ApiPropertyOptional({ type: String })
  address?: string = undefined;

  @ApiProperty({ type: Date })
  createdAt: Date = undefined;

  @ApiProperty({ type: Date })
  updatedAt: Date = undefined;
}
