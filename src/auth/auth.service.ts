import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Permission, Prisma, User } from '@prisma/client';
import { PrismaService } from '@src/prisma/prisma.service';
import { UsersService } from '@src/user/user.service';

export type PermissionWithSubject = Prisma.PermissionGetPayload<{
  include: {
    subject: true;
  };
}>;
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async findAllPermissionsOfUser(user: User): Promise<PermissionWithSubject[]> {
    return await this.prisma.permission.findMany({
      where: {
        rolePermissions: {
          some: {
            roleId: user.roleId,
          },
        },
      },
      include: {
        subject: true,
      },
    });
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.roleId };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
