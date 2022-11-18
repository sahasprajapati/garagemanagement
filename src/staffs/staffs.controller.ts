import { StaffRelations } from '@src/_gen/prisma-class/staff_relations';
import { PageOptionsDto } from '@src/common/dtos/pagination/page-options.dto';
import { PermissionsGuard } from '@src/auth/decorator/permission.guard';
import { FindAllStaffWithSelect } from './dto/staff.dto';
import { PageDto } from '@src/common/dtos/pagination/page.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { StaffsService } from './staffs.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { CheckPermissions } from '@src/auth/decorator/permissions.decorator';
import { PermissionAction } from '@src/common/enums/permission.enum';
import { ApiBearerAuth, ApiExtraModels, ApiOkResponse } from '@nestjs/swagger';
import { ApiPaginatedResponse } from '@src/common/decorators/api-paginated-response.decorator';
import { Staff } from '@src/_gen/prisma-class/staff';


import { IntersectionType, PickType } from '@nestjs/swagger'
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
    return this.staffsService.findAll(pageOptionsDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.staffsService.findOne(+id);
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
