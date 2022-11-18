import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RolePermission {
  @ApiProperty({ type: Number })
  id: number = undefined;

  @ApiPropertyOptional({ type: Number })
  roleId?: number = undefined;

  @ApiPropertyOptional({ type: Number })
  permissionId?: number = undefined;

  @ApiProperty({ type: Date })
  createdAt: Date = undefined;

  @ApiProperty({ type: Date })
  updatedAt: Date = undefined;
}
