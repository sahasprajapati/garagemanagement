import { Module } from '@nestjs/common';
import { VehicleWheelerTypeService } from './vehicle-wheeler-type.service';
import { VehicleWheelerTypeController } from './vehicle-wheeler-type.controller';
import { PrismaModule } from '@src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [VehicleWheelerTypeController],
  providers: [VehicleWheelerTypeService],
})
export class VehicleWheelerTypeModule {}
