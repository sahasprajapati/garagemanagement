import { PermissionAction } from './../../prisma/seed';
import { FindAllUserWithSelect, UserSelect } from '@src/user/dto/user.dto';
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
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PermissionsGuard } from '@src/auth/decorator/permission.guard';
import { CheckPermissions } from '@src/auth/decorator/permissions.decorator';
import {
  CaslAbilityFactory,
} from '@src/auth/casl-ability.factory/casl-ability.factory';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { PageOptionsDto } from '@src/common/dtos/pagination/page-options.dto';
import { ApiPaginatedResponse } from '@src/common/decorators/api-paginated-response.decorator';
import { PageDto } from '@src/common/dtos/pagination/page.dto';

@Controller('users')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
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
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: PageDto<FindAllUserWithSelect> })
  @UseGuards(PermissionsGuard)
  @CheckPermissions([PermissionAction.Read, 'User'])
  async findAll(@Query() pageOptionsDto: PageOptionsDto) {
    // const ability = await this.abilityFactory.createForUser(req.user)
    // ability.can()
    // if (ability.can(PermissionAction.READ, condition)) {
    //   throw new ForbiddenException("You dont have access to this resource!");
    // }
    return this.usersService.findAll(pageOptionsDto);
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
