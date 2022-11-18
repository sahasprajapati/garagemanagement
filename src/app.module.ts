import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { RolesModule } from './roles/roles.module';
import { StaffsModule } from './staffs/staffs.module';
import { UsersModule } from './user/user.module';

@Module({
  imports: [
    PrismaModule,
    
    AuthModule,
    UsersModule,
    StaffsModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
