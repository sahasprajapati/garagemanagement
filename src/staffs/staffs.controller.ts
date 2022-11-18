import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PermissionsGuard } from '@src/auth/decorator/permission.guard';
import { PageOptionsDto } from '@src/common/dtos/pagination/page-options.dto';
import { Staff } from '@src/_gen/prisma-class/staff';
import { StaffRelations } from '@src/_gen/prisma-class/staff_relations';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { StaffsService } from './staffs.service';

import { ApiPaginatedResponse } from '@common/decorators/api-paginated-response.decorator';
import { ApiCustomResponse } from '@common/decorators/api-custom-response.decorator';
import { IntersectionType, PickType } from '@nestjs/swagger';
import { ResponseDto } from '@common/dtos/response.dto';
// import { Product } from './product'
// import { ProductRelations } from './product_relations'

export class StaffDto extends IntersectionType(
  Staff,
  PickType(StaffRelations, ['designation'] as const),
) {}


@Controller('staffs')
@ApiBearerAuth()
export class StaffsController {
  constructor(private readonly staffsService: StaffsService) {}

  @Post()
  create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffsService.create(createStaffDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiPaginatedResponse(StaffDto, true)
  @UseGuards(PermissionsGuard)
  // @CheckPermissions([PermissionAction.Read, 'Staff'])
  async findAll(@Query() pageOptionsDto: PageOptionsDto) {
    // return await this.staffsService.findAll(pageOptionsDto);
    const res = new ResponseDto(
      'Ok',
      await this.staffsService.findAll(pageOptionsDto),
    );
    return res;
  }

  @ApiCustomResponse(StaffDto, true)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const res = new ResponseDto('Ok', await this.staffsService.findOne(+id));
    return res;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staffsService.update(+id, updateStaffDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.staffsService.remove(+id);
  }
}
