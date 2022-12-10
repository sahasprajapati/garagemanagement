import { PartialType } from '@nestjs/swagger';
import { CreateVehicleWheelerTypeDto } from './create-vehicle-wheeler-type.dto';

export class UpdateVehicleWheelerTypeDto extends PartialType(CreateVehicleWheelerTypeDto) {}
