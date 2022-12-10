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
  BadRequestException,
} from '@nestjs/common';
import { VehicleWheelerTypeService } from './vehicle-wheeler-type.service';
import { CreateVehicleWheelerTypeDto } from './dto/create-vehicle-wheeler-type.dto';
import { UpdateVehicleWheelerTypeDto } from './dto/update-vehicle-wheeler-type.dto';
import { ApiCustomResponse } from './../common/decorators/api-custom-response.decorator';
import { CheckPolicies } from '@src/auth/decorator/policy.decorator';
import { CustomPolicyHandler } from './../common/handlers/policy.handler';
import { PermissionAction } from 'src/common/enums/permission.enum';
import { PermissionSubject } from '@common/enums/permission-subject.enum';
import { ResponseDto } from './../common/dtos/response.dto';
import { generateRepsonseMessage } from './../roles/response';
import { ResponseMessage } from '@common/enums/response.enum';
import { VehicleWheelerType } from './../_gen/prisma-class/vehicle_wheeler_type';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from './../common/dtos/pagination/page-options.dto';

@Controller('vehicle-wheeler-type')
@ApiBearerAuth()
@ApiTags('vehicle-wheeler-type')
export class VehicleWheelerTypeController {
  constructor(
    private readonly vehicleWheelerTypeService: VehicleWheelerTypeService,
  ) {}

  @Post()
  @ApiCustomResponse(VehicleWheelerType)
  @CheckPolicies(
    new CustomPolicyHandler(
      PermissionAction.Create,
      PermissionSubject.VehicleWheelerType,
    ),
  )
  async create(
    @Body() createVehicleWheelerTypeDto: CreateVehicleWheelerTypeDto,
  ) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'VehicleWheelerType',
        message: ResponseMessage.Create,
      }),
      await this.vehicleWheelerTypeService.create(createVehicleWheelerTypeDto),
    );
  }

  @Get()
  async findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return await this.vehicleWheelerTypeService.findAll(pageOptionsDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'VehicleWheelerType',
        message: ResponseMessage.Read,
      }),
      await this.vehicleWheelerTypeService.findOne(+id),
    );
  }

  @Get()
  async findOneByName(@Query() query: { name: string }) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'VehicleWheelerType',
        message: ResponseMessage.Read,
      }),
      await this.vehicleWheelerTypeService.findOneByName(query.name),
    );
  }

  @Patch(':id')
  @ApiCustomResponse(VehicleWheelerType, true)
  @CheckPolicies(
    new CustomPolicyHandler(
      PermissionAction.Update,
      PermissionSubject.VehicleWheelerType,
    ),
  )
  async update(
    @Param('id') id: string,
    @Body() updateVehicleWheelerTypeDto: UpdateVehicleWheelerTypeDto,
  ) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'VehicleWheelerType',
        message: ResponseMessage.Update,
      }),
      await this.vehicleWheelerTypeService.update(
        +id,
        updateVehicleWheelerTypeDto,
      ),
    );
  }

  @Delete(':id')
  @ApiCustomResponse(VehicleWheelerType, true)
  @CheckPolicies(
    new CustomPolicyHandler(
      PermissionAction.Delete,
      PermissionSubject.VehicleWheelerType,
    ),
  )
  async remove(@Param('id') id: string) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'VehicleWheelerType',
        message: ResponseMessage.Delete,
      }),
      await this.vehicleWheelerTypeService.remove(+id),
    );
  }

  @Put('/delete')
  @ApiCustomResponse(VehicleWheelerType, true)
  @CheckPolicies(
    new CustomPolicyHandler(
      PermissionAction.Delete,
      PermissionSubject.VehicleWheelerType,
    ),
  )
  async removeMulti(@Body('ids') ids: number[]) {
    if (ids == undefined || ids.length <= 0) {
      throw new BadRequestException(
        generateRepsonseMessage({
          model: 'VehicleWheelerType',
          message: ' Cannot perform this action',
        }),
      );
    }
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'VehicleWheelerType',
        message: ResponseMessage.Delete,
      }),
      await this.vehicleWheelerTypeService.removeMulti(ids),
    );
  }
}
