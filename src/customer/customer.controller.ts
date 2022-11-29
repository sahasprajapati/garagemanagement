import { ApiCustomResponse } from '@common/decorators/api-custom-response.decorator';
import { Customer } from '@gen/prisma-class/customer';
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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CheckPolicies } from '@src/auth/decorator/policy.decorator';
import { CustomPolicyHandler } from './../common/handlers/policy.handler';
import { PermissionAction } from '@src/common/enums/permission.enum';
import { PermissionSubject } from '@common/enums/permission-subject.enum';
import { ResponseDto } from './../common/dtos/response.dto';
import { generateRepsonseMessage } from './../roles/response';
import { ResponseMessage } from '@common/enums/response.enum';
import { PageOptionsDto } from './../common/dtos/pagination/page-options.dto';

@Controller('customers')
@ApiBearerAuth()
@ApiTags('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @ApiCustomResponse(Customer)
  @CheckPolicies(
    new CustomPolicyHandler(
      PermissionAction.Create,
      PermissionSubject.Customer,
    ),
  )
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'Customer',
        message: ResponseMessage.Create,
      }),
      await this.customerService.create(createCustomerDto),
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
        model: 'Customer',
        message: ResponseMessage.Read,
      }),
      await this.customerService.findOne(+id),
    );
  }

  @Patch(':id')
  @ApiCustomResponse(Customer, true)
  @CheckPolicies(
    new CustomPolicyHandler(
      PermissionAction.Update,
      PermissionSubject.Customer,
    ),
  )
  async update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'Customer',
        message: ResponseMessage.Update,
      }),
      await this.customerService.update(+id, updateCustomerDto),
    );
  }

  @Delete(':id')
  @ApiCustomResponse(Customer, true)
  @CheckPolicies(
    new CustomPolicyHandler(
      PermissionAction.Delete,
      PermissionSubject.Customer,
    ),
  )
  async remove(@Param('id') id: string) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'Customer',
        message: ResponseMessage.Delete,
      }),
      await this.customerService.remove(+id),
    );
  }
}
