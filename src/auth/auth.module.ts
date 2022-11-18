import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '@src/prisma/prisma.module';
import { UsersService } from '@src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CaslAbilityFactory } from './casl-ability.factory/casl-ability.factory';
import { jwtConstants } from './constants';
import { PermissionsGuard } from './decorator/permission.guard';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './decorator/jwt-auth.guard';
import { appConfig } from '@src/common/utils/config';
@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: appConfig.jwt.secret,
      signOptions: { expiresIn: appConfig.jwt.expiry },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PermissionsGuard,
    CaslAbilityFactory,
    UsersService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [CaslAbilityFactory, PermissionsGuard, AuthService],
})
export class AuthModule {}
