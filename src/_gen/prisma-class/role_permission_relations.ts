import { Permission } from './permission';
import { Role } from './role';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class RolePermissionRelations {
  @ApiPropertyOptional({ type: () => Permission })
  permission?: Permission = undefined;

  @ApiPropertyOptional({ type: () => Role })
  role?: Role = undefined;
}
