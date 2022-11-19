import { MongoAbility } from '@casl/ability';
import { PermissionSubject } from '@common/enums/permission-subject.enum';
import { CustomPolicyHandler } from '@common/handlers/policy.handler';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PermissionAction } from '@src/common/enums/permission.enum';
import { AuthService } from './auth.service';
import { CaslAbilityFactory } from './casl-ability.factory/casl-ability.factory';
import { LocalAuthGuard } from './decorator/auth.guard';
import { JwtAuthGuard } from './decorator/jwt-auth.guard';
import { CheckPolicies } from './decorator/policy.decorator';
import { PoliciesGuard } from './decorator/policy.guard';
import { Public } from './decorator/public.decorator';
import { LoginDto } from './dto/login.dto';

@ApiBearerAuth()
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private abilityFactory: CaslAbilityFactory,
  ) {}
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() login: LoginDto, @Request() req) {
    return {
      data: await this.authService.login(req.user),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return {
      data: req.user,
    };
  }
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Request() req) {
    return {
      data: req.user,
    };
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(PoliciesGuard)
  @CheckPolicies(
    new CustomPolicyHandler(PermissionAction.Read, PermissionSubject.User),
  )
  @Get('protected')
  async protectedData(@Request() req) {
    return {
      data: 'Protected data',
    };
  }
}
