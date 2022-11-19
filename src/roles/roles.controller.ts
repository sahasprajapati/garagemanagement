import { PageOptionsDto } from '@src/common/dtos/pagination/page-options.dto';
import { PageDto } from '@src/common/dtos/pagination/page.dto';
import { FindAllRoleWithSelect } from './dto/role.dto';
import { PermissionsGuard } from '@src/auth/decorator/permission.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  Query,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CheckPermissions } from '@src/auth/decorator/permissions.decorator';
import { PermissionAction } from '@common/enums/permission.enum';

@Controller('roles')
@ApiBearerAuth()
@ApiTags('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: PageDto<FindAllRoleWithSelect> })
  @UseGuards(PermissionsGuard)
  @CheckPermissions([PermissionAction.Read, 'Staff'])
  async findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this.rolesService.findAll(pageOptionsDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
