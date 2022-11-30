import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
  findAll() {
    return this.ownedVehicleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ownedVehicleService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOwnedVehicleDto: UpdateOwnedVehicleDto,
  ) {
    return this.ownedVehicleService.update(+id, updateOwnedVehicleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ownedVehicleService.remove(+id);
  }
}
