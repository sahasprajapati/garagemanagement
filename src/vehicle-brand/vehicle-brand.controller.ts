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
  BadRequestException,
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
import { VehicleBrandService } from './vehicle-brand.service';
import { VehicleBrand } from '@gen/prisma-class/vehicle_brand';
import { CreateVehicleBrandDto } from './dto/create-vehicle-brand.dto';
import { UpdateVehicleBrandDto } from './dto/update-vehicle-brand.dto';

@Controller('vehicle-brands')
@ApiBearerAuth()
@ApiTags('vehicle-brands')
export class VehicleBrandController {
  constructor(private readonly vehicleBrandService: VehicleBrandService) {}

  @Post()
  @ApiCustomResponse(VehicleBrand)
  @CheckPolicies(
    new CustomPolicyHandler(
      PermissionAction.Create,
      PermissionSubject.VehicleBrand,
    ),
  )
  async create(@Body() createVehicleBrandDto: CreateVehicleBrandDto) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'VehicleBrand',
        message: ResponseMessage.Create,
      }),
      await this.vehicleBrandService.create(createVehicleBrandDto),
    );
  }

  @Get()
  async findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return await this.vehicleBrandService.findAll(pageOptionsDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'VehicleBrand',
        message: ResponseMessage.Read,
      }),
      await this.vehicleBrandService.findOne(+id),
    );
  }

  @Get()
  async findOneByName(@Query() query: { name: string }) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'VehicleBrand',
        message: ResponseMessage.Read,
      }),
      await this.vehicleBrandService.findOneByName(query.name),
    );
  }

  @Patch(':id')
  @ApiCustomResponse(VehicleBrand, true)
  @CheckPolicies(
    new CustomPolicyHandler(
      PermissionAction.Update,
      PermissionSubject.VehicleBrand,
    ),
  )
  async update(
    @Param('id') id: string,
    @Body() updateVehicleBrandDto: UpdateVehicleBrandDto,
  ) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'VehicleBrand',
        message: ResponseMessage.Update,
      }),
      await this.vehicleBrandService.update(+id, updateVehicleBrandDto),
    );
  }

  @Delete(':id')
  @ApiCustomResponse(VehicleBrand, true)
  @CheckPolicies(
    new CustomPolicyHandler(
      PermissionAction.Delete,
      PermissionSubject.VehicleBrand,
    ),
  )
  async remove(@Param('id') id: string) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'VehicleBrand',
        message: ResponseMessage.Delete,
      }),
      await this.vehicleBrandService.remove(+id),
    );
  }

  @Put('/delete')
  @ApiCustomResponse(VehicleBrand, true)
  @CheckPolicies(
    new CustomPolicyHandler(
      PermissionAction.Delete,
      PermissionSubject.VehicleBrand,
    ),
  )
  async removeMulti(@Body('ids') ids: number[]) {
    if (ids == undefined || ids.length <= 0) {
      throw new BadRequestException(
        generateRepsonseMessage({
          model: 'VehicleBrand',
          message: ' Cannot perform this action',
        }),
      );
    }
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'VehicleBrand',
        message: ResponseMessage.Delete,
      }),
      await this.vehicleBrandService.removeMulti(ids),
    );
  }
}
