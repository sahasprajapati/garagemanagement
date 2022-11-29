import { VehicleWheelerType } from './vehicle_wheeler_type';
import { Vehicle } from './vehicle';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class VehicleTypeRelations {
  @ApiPropertyOptional({ type: () => VehicleWheelerType })
  VehicleWheelerType?: VehicleWheelerType = undefined;

  @ApiProperty({ isArray: true, type: () => Vehicle })
  Vehicle: Vehicle[] = undefined;
}
