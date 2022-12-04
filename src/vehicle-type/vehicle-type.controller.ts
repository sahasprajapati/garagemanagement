import { ApiCustomResponse } from '@common/decorators/api-custom-response.decorator';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CheckPolicies } from '@src/auth/decorator/policy.decorator';
import { CustomPolicyHandler } from './../common/handlers/policy.handler';
import { PermissionAction } from '@src/common/enums/permission.enum';
import { PermissionSubject } from '@common/enums/permission-subject.enum';
import { ResponseDto } from './../common/dtos/response.dto';
import { generateRepsonseMessage } from './../roles/response';
import { ResponseMessage } from '@common/enums/response.enum';
import { PageOptionsDto } from './../common/dtos/pagination/page-options.dto';
import { VehicleType } from '@gen/prisma-class/vehicle_type';
import { VehicleTypeService } from './vehicle-type.service';
import { CreateVehicleTypeDto } from './dto/create-vehicle-type.dto';
import { UpdateVehicleTypeDto } from './dto/update-vehicle-type.dto';

@Controller('vehicle-types')
@ApiBearerAuth()
@ApiTags('vehicle-types')
export class VehicleTypeController {
  constructor(private readonly customerService: VehicleTypeService) {}

  @Post()
  @ApiCustomResponse(VehicleType)
  @CheckPolicies(
    new CustomPolicyHandler(
      PermissionAction.Create,
      PermissionSubject.VehicleType,
    ),
  )
  async create(@Body() createVehicleTypeDto: CreateVehicleTypeDto) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'VehicleType',
        message: ResponseMessage.Create,
      }),
      await this.customerService.create(createVehicleTypeDto),
    );
  }

  @Get()
  async findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return await this.customerService.findAll(pageOptionsDto);
  }

  @Get(':id')
  async indOne(@Param('id') id: string) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'VehicleType',
        message: ResponseMessage.Read,
      }),
      await this.customerService.findOne(+id),
    );
  }

  @Patch(':id')
  @ApiCustomResponse(VehicleType, true)
  @CheckPolicies(
    new CustomPolicyHandler(
      PermissionAction.Update,
      PermissionSubject.VehicleType,
    ),
  )
  async update(
    @Param('id') id: string,
    @Body() updateVehicleTypeDto: UpdateVehicleTypeDto,
  ) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'VehicleType',
        message: ResponseMessage.Update,
      }),
      await this.customerService.update(+id, updateVehicleTypeDto),
    );
  }

  @Delete(':id')
  @ApiCustomResponse(VehicleType, true)
  @CheckPolicies(
    new CustomPolicyHandler(
      PermissionAction.Delete,
      PermissionSubject.VehicleType,
    ),
  )
  async remove(@Param('id') id: string) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'VehicleType',
        message: ResponseMessage.Delete,
      }),
      await this.customerService.remove(+id),
    );
  }

  @Put('/delete')
  @ApiCustomResponse(VehicleType, true)
  @CheckPolicies(
    new CustomPolicyHandler(
      PermissionAction.Delete,
      PermissionSubject.VehicleType,
    ),
  )
  async removeMulti(@Body('ids') ids: number[]) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'VehicleType',
        message: ResponseMessage.Delete,
      }),
      await this.customerService.removeMulti(ids),
    );
  }
}
