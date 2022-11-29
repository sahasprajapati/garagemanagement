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

@Module({
  imports: [PrismaModule, AuthModule, UsersModule, StaffsModule, RolesModule, CustomerModule],
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
