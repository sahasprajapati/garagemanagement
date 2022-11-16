import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PermissionsGuard } from 'src/auth/decorator/permission.guard';
import { CheckPermissions } from 'src/auth/decorator/permissions.decorator';
import {
  CaslAbilityFactory,
  PermissionAction,
} from 'src/auth/casl-ability.factory/casl-ability.factory';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private abilityFactory: CaslAbilityFactory,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  @UseGuards(PermissionsGuard)
  @CheckPermissions([PermissionAction.Create, 'Invoice'])
  async findAll() {
    // const ability = await this.abilityFactory.createForUser(req.user)
    // ability.can()
    // if (ability.can(PermissionAction.READ, condition)) {
    //   throw new ForbiddenException("You dont have access to this resource!");
    // }
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: UserEntity })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: UserEntity })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
