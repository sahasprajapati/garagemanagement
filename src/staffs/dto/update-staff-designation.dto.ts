import { PartialType } from '@nestjs/swagger';
import { CreateStaffDesignationDto } from './create-staff-designation.dto';

export class UpdateStaffDesignationDto extends PartialType(CreateStaffDesignationDto) {}
