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
import { VehicleService } from './vehicle.service';
import { Vehicle } from '@gen/prisma-class/vehicle';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { CreateVehicleDto } from './dto/create-vehicle.dto';

@Controller('vehicles')
@ApiBearerAuth()
@ApiTags('vehicles')
export class VehicleController {
  constructor(private readonly customerService: VehicleService) {}

  @Post()
  @ApiCustomResponse(Vehicle)
  @CheckPolicies(
    new CustomPolicyHandler(
      PermissionAction.Create,
      PermissionSubject.Vehicle,
    ),
  )
  async create(@Body() createVehicleDto: CreateVehicleDto) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'Vehicle',
        message: ResponseMessage.Create,
      }),
      await this.customerService.create(createVehicleDto),
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
        model: 'Vehicle',
        message: ResponseMessage.Read,
      }),
      await this.customerService.findOne(+id),
    );
  }

  @Patch(':id')
  @ApiCustomResponse(Vehicle, true)
  @CheckPolicies(
    new CustomPolicyHandler(
      PermissionAction.Update,
      PermissionSubject.Vehicle,
    ),
  )
  async update(
    @Param('id') id: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'Vehicle',
        message: ResponseMessage.Update,
      }),
      await this.customerService.update(+id, updateVehicleDto),
    );
  }

  @Delete(':id')
  @ApiCustomResponse(Vehicle, true)
  @CheckPolicies(
    new CustomPolicyHandler(
      PermissionAction.Delete,
      PermissionSubject.Vehicle,
    ),
  )
  async remove(@Param('id') id: string) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'Vehicle',
        message: ResponseMessage.Delete,
      }),
      await this.customerService.remove(+id),
    );
  }

  @Put('/delete')
  @ApiCustomResponse(Vehicle, true)
  @CheckPolicies(
    new CustomPolicyHandler(
      PermissionAction.Delete,
      PermissionSubject.Vehicle,
    ),
  )
  async removeMulti(@Body('ids') ids: number[]) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'Vehicle',
        message: ResponseMessage.Delete,
      }),
      await this.customerService.removeMulti(ids),
    );
  }
}
