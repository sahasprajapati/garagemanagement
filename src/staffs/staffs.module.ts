import { AuthModule } from '@src/auth/auth.module';
import { CaslAbilityFactory } from '@src/auth/casl-ability.factory/casl-ability.factory';
import { PrismaModule } from '@src/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { StaffsService } from './staffs.service';
import { StaffsController } from './staffs.controller';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [StaffsController],
  providers: [StaffsService],
})
export class StaffsModule {}
