import { Module } from '@nestjs/common';
import { OwnedVehicleService } from './owned-vehicle.service';
import { OwnedVehicleController } from './owned-vehicle.controller';
import { PrismaModule } from '@src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [OwnedVehicleController],
  providers: [OwnedVehicleService],
})
export class OwnedVehicleModule {}
