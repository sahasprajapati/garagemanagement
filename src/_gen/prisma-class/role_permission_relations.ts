import { Role } from './role';
import { Permission } from './permission';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class RolePermissionRelations {
  @ApiPropertyOptional({ type: () => Role })
  role?: Role = undefined;

  @ApiPropertyOptional({ type: () => Permission })
  permission?: Permission = undefined;
}
