import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { OwnedVehicleService } from './owned-vehicle.service';
import { CreateOwnedVehicleDto } from './dto/create-owned-vehicle.dto';
import { UpdateOwnedVehicleDto } from './dto/update-owned-vehicle.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OwnedVehicle } from '@gen/prisma-class/owned_vehicle';
import { ApiCustomResponse } from '@common/decorators/api-custom-response.decorator';
import { CheckPolicies } from '@src/auth/decorator/policy.decorator';
import { CustomPolicyHandler } from '@common/handlers/policy.handler';
import { PermissionAction } from '@src/common/enums/permission.enum';
import { PermissionSubject } from '@common/enums/permission-subject.enum';
import { ResponseDto } from '@common/dtos/response.dto';
import { generateRepsonseMessage } from '@src/roles/response';
import { ResponseMessage } from '@common/enums/response.enum';
import { PageOptionsDto } from './../common/dtos/pagination/page-options.dto';

@Controller('owned-vehicle')
@ApiBearerAuth()
@ApiTags('staffs')
export class OwnedVehicleController {
  constructor(private readonly ownedVehicleService: OwnedVehicleService) {}

  @Post()
  @ApiCustomResponse(OwnedVehicle)
  @CheckPolicies(
    new CustomPolicyHandler(
      PermissionAction.Create,
      PermissionSubject.OwnedVehicle,
    ),
  )
  async create(@Body() createOwnedVehicleDto: CreateOwnedVehicleDto) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'Owned Vehicle',
        message: ResponseMessage.Create,
      }),
      await this.ownedVehicleService.create(createOwnedVehicleDto),
    );
  }

  @Get()
  async findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this.ownedVehicleService.findAll(pageOptionsDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'Owned Vehicle',
        message: ResponseMessage.Read,
      }),
      await this.ownedVehicleService.findOne(+id),
    );
  }

  @Patch(':id')
  @ApiCustomResponse(OwnedVehicle, true)
  @CheckPolicies(
    new CustomPolicyHandler(
      PermissionAction.Update,
      PermissionSubject.OwnedVehicle,
    ),
  )
  async update(
    @Param('id') id: string,
    @Body() updateOwnedVehicleDto: UpdateOwnedVehicleDto,
  ) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'Owned Vehicle',
        message: ResponseMessage.Update,
      }),
      await this.ownedVehicleService.update(+id, updateOwnedVehicleDto),
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'Owned Vehicle',
        message: ResponseMessage.Delete,
      }),
      await this.ownedVehicleService.remove(+id),
    );
  }
}
