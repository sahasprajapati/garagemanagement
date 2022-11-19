import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { appConfig } from '@src/common/utils/config';
import { PrismaModule } from '@src/prisma/prisma.module';
import { UsersService } from '@src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CaslAbilityFactory } from './casl-ability.factory/casl-ability.factory';
import { JwtAuthGuard } from './decorator/jwt-auth.guard';
import { PermissionsGuard } from './decorator/permission.guard';
import { PoliciesGuard } from './decorator/policy.guard';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
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
    {
      provide: APP_GUARD,
      useClass: PoliciesGuard,
    },
  ],
  exports: [CaslAbilityFactory, PermissionsGuard, AuthService],
})
export class AuthModule {}
