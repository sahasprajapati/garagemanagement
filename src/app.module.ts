import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './all-exception.filter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { RolesModule } from './roles/roles.module';
import { StaffsModule } from './staffs/staffs.module';
import { UsersModule } from './user/user.module';
import { CustomerModule } from './customer/customer.module';
import { OwnedVehicleModule } from './owned-vehicle/owned-vehicle.module';
import { ServiceModule } from './service/service.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { VehicleBrandModule } from './vehicle-brand/vehicle-brand.module';
import { VehicleTypeModule } from './vehicle-type/vehicle-type.module';
import { VehicleWheelerTypeModule } from './vehicle-wheeler-type/vehicle-wheeler-type.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    StaffsModule,
    RolesModule,
    CustomerModule,
    OwnedVehicleModule,
    VehicleModule,
    VehicleBrandModule,
    VehicleTypeModule,
    ServiceModule,
    VehicleWheelerTypeModule,
    TransactionModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
