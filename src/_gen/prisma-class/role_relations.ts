import { User } from './user';
import { RolePermission } from './role_permission';
import { ApiProperty } from '@nestjs/swagger';

export class RoleRelations {
  @ApiProperty({ isArray: true, type: () => User })
  user: User[] = undefined;

  @ApiProperty({ isArray: true, type: () => RolePermission })
  rolePermissions: RolePermission[] = undefined;
}
