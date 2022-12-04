import { Module } from '@nestjs/common';
import { PrismaModule } from '@src/prisma/prisma.module';
import { VehicleBrandController } from './vehicle-brand.controller';
import { VehicleBrandService } from './vehicle-brand.service';

@Module({
  imports: [PrismaModule],
  controllers: [VehicleBrandController],
  providers: [VehicleBrandService],
})
export class VehicleBrandModule {}
