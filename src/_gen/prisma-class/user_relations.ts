import { Role } from './role';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UserRelations {
  @ApiPropertyOptional({ type: () => Role })
  role?: Role = undefined;
}
