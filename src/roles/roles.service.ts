import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PageOptionsDto } from '@src/common/dtos/pagination/page-options.dto';
import { PageDto } from '@src/common/dtos/pagination/page.dto';
import { paginate } from '@src/common/utils/paginate';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { FindAllRoleWithSelect } from './dto/role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}
  async create(createRoleDto: CreateRoleDto) {
    const role = await this.prisma.role.upsert({
      where: {
        name: createRoleDto.name,
      },
      update: {},
      create: {
        name: createRoleDto.name,
      },
    });
    const role_permission = createRoleDto.permissionIds.map(
      async (permissionId) => {
        await this.prisma.rolePermission.upsert({
          where: {
            rolePermissionIdentifier: {
              roleId: role.id,
              permissionId: permissionId,
            },
          },
          update: {},
          create: {
            roleId: role.id,
            permissionId: permissionId,
          },
        });
      },
    );
    Promise.all(role_permission);

    return role;
  }

  // findAll() {
  //   // CRUD operations
  //   return this.prisma.role.findMany();
  // }
  async findAll(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<FindAllRoleWithSelect>> {
    // Get proper criteria using prisma findMany types
    // this.prisma.user.findMany();
    const criteria: Prisma.RoleFindManyArgs = {
      where: {
        name: {
          ...(pageOptionsDto.filter ? { search: pageOptionsDto.filter } : {}),
        },
      },
      skip: pageOptionsDto.skip,
      take: pageOptionsDto.take,
      orderBy: {
        createdAt: pageOptionsDto.order,
      },
      select: {
        name: true,
        rolePermissions: {
          select: {
            permission: {
              select: {
                action: true,
                condition: true,
                subject: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    };
    const roles = await paginate<FindAllRoleWithSelect, Prisma.RoleFindManyArgs>(
      this.prisma.role,
      criteria,
      pageOptionsDto,
    );
    return roles;
  }

  findOne(id: number) {
    return this.prisma.role.findFirst({
      where: {
        id: id,
      },
    });
  }

  findOneByName(name: string) {
    return this.prisma.role.findFirst({
      where: {
        name: name,
      },
    });
  }

  update(id: number, updateroleDto: UpdateRoleDto) {
    return this.prisma.role.update({
      where: { id },

      data: updateroleDto,
    });
  }

  remove(id: number) {
    return this.prisma.role.delete({ where: { id } });
  }
}
