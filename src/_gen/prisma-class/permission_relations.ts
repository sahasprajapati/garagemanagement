import { RolePermission } from './role_permission';
import { Subject } from './subject';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PermissionRelations {
  @ApiProperty({ isArray: true, type: () => RolePermission })
  rolePermissions: RolePermission[] = undefined;

  @ApiPropertyOptional({ type: () => Subject })
  subject?: Subject = undefined;
}
