import { Module } from '@nestjs/common';
import { PrismaModule } from '@src/prisma/prisma.module';
import { VehicleTypeController } from './vehicle-type.controller';
import { VehicleTypeService } from './vehicle-type.service';

@Module({
  imports: [PrismaModule],
  controllers: [VehicleTypeController],
  providers: [VehicleTypeService],
})
export class VehicleTypeModule {}
