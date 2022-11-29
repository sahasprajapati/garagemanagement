import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from '@src/common/dtos/pagination/page-options.dto';
import { PermissionAction } from '@src/common/enums/permission.enum';
import { StaffRelations } from '@src/_gen/prisma-class/staff_relations';
import { generateRepsonseMessage } from './../roles/response';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateAttendanceDto, UpdateStaffDto } from './dto/update-staff.dto';
import { StaffsService } from './staffs.service';

import { ApiCustomResponse } from '@common/decorators/api-custom-response.decorator';
import { ApiPaginatedResponse } from '@common/decorators/api-paginated-response.decorator';
import { ResponseDto } from '@common/dtos/response.dto';
import { PermissionSubject } from '@common/enums/permission-subject.enum';
import { ResponseMessage } from '@common/enums/response.enum';
import { CustomPolicyHandler } from '@common/handlers/policy.handler';
import { IntersectionType, PickType } from '@nestjs/swagger';
import { CheckPolicies } from '@src/auth/decorator/policy.decorator';
import { StaffFindAllDto } from './staff.dto';
import { Staff } from '@gen/prisma-class/staff';
import { StaffDesignation } from '@gen/prisma-class/staff_designation';
import { CreateStaffDesignationDto } from './dto/create-staff-designation.dto';
import { UpdateStaffDesignationDto } from './dto/update-staff-designation.dto';
import { UserFindAllDto } from '@src/user/dto/user.dto';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { Leave } from '@gen/prisma-class/leave';
import { UpdateLeaveDto } from './dto/update-leave.dto';
// import { Product } from './product'
// import { ProductRelations } from './product_relations'

export class StaffDto extends IntersectionType(
  Staff,
  PickType(StaffRelations, ['designation'] as const),
) {}

@Controller('staffs')
@ApiBearerAuth()
@ApiTags('staffs')
export class StaffsController {
  constructor(private readonly staffsService: StaffsService) {}

  // -------------- Staff Designation

  @Post('designation')
  @ApiCustomResponse(StaffDesignation)
  @CheckPolicies(
    new CustomPolicyHandler(
      PermissionAction.Create,
      PermissionSubject.StaffDesignation,
    ),
  )
  async createStaffDesignation(
    @Body() createStaffDesignationDto: CreateStaffDesignationDto,
  ) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'Staff Designation',
        message: ResponseMessage.Create,
      }),
      await this.staffsService.createDesignation(createStaffDesignationDto),
    );
  }

  @Get('designation')
  @ApiPaginatedResponse(StaffDesignation, true)
  @CheckPolicies(
    new CustomPolicyHandler(
      PermissionAction.Read,
      PermissionSubject.StaffDesignation,
    ),
  )
  async findAllStaffDesignation(@Query() pageOptionsDto: PageOptionsDto) {
    // const ability = await this.abilityFactory.createForStaffDesignation(req.user)
    // ability.can()
    // if (ability.can(PermissionAction.READ, condition)) {
    //   throw new ForbiddenException("You dont have access to this resource!");
    // }
    return this.staffsService.findAllDesignation(pageOptionsDto);
  }

  // @Get('designation/:id')
  // @ApiCustomResponse(StaffDesignation, true)
  // @CheckPolicies(
  //   new CustomPolicyHandler(
  //     PermissionAction.Read,
  //     PermissionSubject.StaffDesignation,
  //   ),
  // )
  async findOneStaffDesignation(@Param('id') id: string) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'Staff Designation',
        message: ResponseMessage.Read,
      }),
      await this.staffsService.findOneDesignation(+id),
    );
  }

  @Patch('designation/:id')
  @ApiCustomResponse(StaffDesignation, true)
  @CheckPolicies(
    new CustomPolicyHandler(
      PermissionAction.Update,
      PermissionSubject.StaffDesignation,
    ),
  )
  async updateStaffDesignation(
    @Param('id') id: string,
    @Body() updateStaffDesignationDto: UpdateStaffDesignationDto,
  ) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'Staff Designation',
        message: ResponseMessage.Update,
      }),
      await this.staffsService.updateDesignation(
        +id,
        updateStaffDesignationDto,
      ),
    );
  }

  @Delete('/designation/:id')
 
  async removeStaffDesignation(@Param('id') id: string) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'Staff Designation',
        message: ResponseMessage.Delete,
      }),
      await this.staffsService.removeDesgination(+id),
    );
  }

  // ---------LEAVE--------
  @Post("/leave")
  @ApiCustomResponse(Leave)
  @CheckPolicies(
    new CustomPolicyHandler(PermissionAction.Create, PermissionSubject.Leave),
  )
  async createStaffLeave(@Body() createStaffLeaveDto: CreateLeaveDto) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'Leave',
        message: ResponseMessage.Create,
      }),
      await this.staffsService.applyLeave(createStaffLeaveDto),
    );
  }

  @Patch('leave/:id')
  @ApiCustomResponse(StaffFindAllDto, true)
  @CheckPolicies(
    new CustomPolicyHandler(PermissionAction.Update, PermissionSubject.User),
  )
  async updateLeave(@Param('id') id: string, @Body() updateStaffLeaveDto: UpdateLeaveDto) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'Leave',
        message: ResponseMessage.Update,
      }),
      await this.staffsService.updateLeave(+id, updateStaffLeaveDto),
    );
  }



  // ---------------STAFF-------------
  @Post()
  @ApiCustomResponse(Staff)
  @CheckPolicies(
    new CustomPolicyHandler(PermissionAction.Create, PermissionSubject.User),
  )
  async create(@Body() createUserDto: CreateStaffDto) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'Staff',
        message: ResponseMessage.Create,
      }),
      await this.staffsService.create(createUserDto),
    );
  }

  @Get()
  @ApiPaginatedResponse(StaffFindAllDto, true)
  @CheckPolicies(
    new CustomPolicyHandler(PermissionAction.Read, PermissionSubject.User),
  )
  async findAll(@Query() pageOptionsDto: PageOptionsDto) {
    // const ability = await this.abilityFactory.createForUser(req.user)
    // ability.can()
    // if (ability.can(PermissionAction.READ, condition)) {
    //   throw new ForbiddenException("You dont have access to this resource!");
    // }
    return this.staffsService.findAll(pageOptionsDto);
  }
  @Get()
  @ApiPaginatedResponse(StaffFindAllDto, true)
  @CheckPolicies(
    new CustomPolicyHandler(PermissionAction.Read, PermissionSubject.User),
  )
  async findAllOnLeave(@Query() pageOptionsDto: PageOptionsDto) {
    // const ability = await this.abilityFactory.createForUser(req.user)
    // ability.can()
    // if (ability.can(PermissionAction.READ, condition)) {
    //   throw new ForbiddenException("You dont have access to this resource!");
    // }
    return this.staffsService.staffsOnLeave(pageOptionsDto);
  }

  @Get('onLeave')
  @ApiPaginatedResponse(StaffFindAllDto, true)
  @CheckPolicies(
    new CustomPolicyHandler(PermissionAction.Read, PermissionSubject.User),
  )
  async findAllStaffsOnLeave(@Query() pageOptionsDto: PageOptionsDto) {
    // const ability = await this.abilityFactory.createForUser(req.user)
    // ability.can()
    // if (ability.can(PermissionAction.READ, condition)) {
    //   throw new ForbiddenException("You dont have access to this resource!");
    // }
    return this.staffsService.staffsOnLeave(pageOptionsDto);
  }

  @Get('attendance')
  @ApiPaginatedResponse(StaffFindAllDto, true)
  @CheckPolicies(
    new CustomPolicyHandler(PermissionAction.Read, PermissionSubject.User),
  )
  async findAllStaffAttendance(@Query() pageOptionsDto: PageOptionsDto) {
    // const ability = await this.abilityFactory.createForUser(req.user)
    // ability.can()
    // if (ability.can(PermissionAction.READ, condition)) {
    //   throw new ForbiddenException("You dont have access to this resource!");
    // }
    return this.staffsService.findAllStaffsAttendance(pageOptionsDto);
  }
  @Get(':id')
  @ApiCustomResponse(StaffFindAllDto, true)
  @CheckPolicies(
    new CustomPolicyHandler(PermissionAction.Read, PermissionSubject.User),
  )
  async findOne(@Param('id') id: string) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'Staff',
        message: ResponseMessage.Read,
      }),
      await this.staffsService.findOne(+id),
    );
  }

  @Patch('attendance')
  @ApiCustomResponse(StaffFindAllDto, true)
  @CheckPolicies(
    new CustomPolicyHandler(PermissionAction.Update, PermissionSubject.User),
  )
  async updateAttendance(@Body() updateAttendanceDto: UpdateAttendanceDto) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'Staff',
        message: ResponseMessage.Update,
      }),
      await this.staffsService.updateAttendance(updateAttendanceDto),
    );
  }

  @Patch(':id')
  @ApiCustomResponse(StaffFindAllDto, true)
  @CheckPolicies(
    new CustomPolicyHandler(PermissionAction.Update, PermissionSubject.User),
  )
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateStaffDto) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'Staff',
        message: ResponseMessage.Update,
      }),
      await this.staffsService.update(+id, updateUserDto),
    );
  }

  @Delete(':id')
  @ApiCustomResponse(StaffFindAllDto, true)
  @CheckPolicies(
    new CustomPolicyHandler(PermissionAction.Delete, PermissionSubject.User),
  )
  async remove(@Param('id') id: string) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'Staff',
        message: ResponseMessage.Delete,
      }),
      await this.staffsService.remove(+id),
    );
  }

  @Put('/delete')
  @ApiCustomResponse(UserFindAllDto, true)
  @CheckPolicies(
    new CustomPolicyHandler(PermissionAction.Delete, PermissionSubject.User),
  )
  async removeMulti(@Body('ids') ids: number[]) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'Staff',
        message: ResponseMessage.Delete,
      }),
      await this.staffsService.removeMulti(ids),
    );
  }


}
