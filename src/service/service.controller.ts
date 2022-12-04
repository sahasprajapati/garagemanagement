import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiCustomResponse } from '@common/decorators/api-custom-response.decorator';
import { CheckPolicies } from '@src/auth/decorator/policy.decorator';
import { CustomPolicyHandler } from '@common/handlers/policy.handler';
import { PermissionAction } from '@common/enums/permission.enum';
import { PermissionSubject } from '@common/enums/permission-subject.enum';
import { Service } from './../_gen/prisma-class/service';
import { ResponseDto } from '@common/dtos/response.dto';
import { generateRepsonseMessage } from '@src/roles/response';
import { ResponseMessage } from '@common/enums/response.enum';

@Controller('service')
@ApiBearerAuth()
@ApiTags('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  @ApiCustomResponse(Service)
  @CheckPolicies(
    new CustomPolicyHandler(PermissionAction.Create, PermissionSubject.Service),
  )
  async create(@Body() createServiceDto: CreateServiceDto) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'Service',
        message: ResponseMessage.Create,
      }),
      await this.serviceService.create(createServiceDto),
    );
  }

  @Get()
  findAll() {
    return this.serviceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceService.findOne(+id);
  }

  @Patch(':id')
  @ApiCustomResponse(Service, true)
  @CheckPolicies(
    new CustomPolicyHandler(PermissionAction.Update, PermissionSubject.Service),
  )
  async update(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'Service',
        message: ResponseMessage.Update,
      }),
      await this.serviceService.update(+id, updateServiceDto),
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceService.remove(+id);
  }
}
