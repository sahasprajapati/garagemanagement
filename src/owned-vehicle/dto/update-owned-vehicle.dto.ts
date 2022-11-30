import { PartialType } from '@nestjs/swagger';
import { CreateOwnedVehicleDto } from './create-owned-vehicle.dto';

export class UpdateOwnedVehicleDto extends PartialType(CreateOwnedVehicleDto) {}
