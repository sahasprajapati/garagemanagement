import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PageOptionsDto } from '@src/common/dtos/pagination/page-options.dto';
import { paginate } from '@src/common/utils/paginate';
import { PrismaService } from '@src/prisma/prisma.service';
import { PageDto } from '../common/dtos/pagination/page.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindAllUserWithSelect } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: createUserDto.password,
        roleId: createUserDto.roleId,
      },
    });
  }

  async findAll(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<FindAllUserWithSelect>> {
    // Get proper criteria using prisma findMany types
    // this.prisma.user.findMany();
    const criteria: Prisma.UserFindManyArgs = {
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
        id: true,
        name: true,
        email: true,
        role: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    };
    const users = await paginate<
      FindAllUserWithSelect,
      Prisma.UserFindManyArgs
    >(this.prisma.user, criteria, pageOptionsDto);
    return users;
  }

  findOne(id: number) {
    return this.prisma.user.findFirst({
      where: {
        id: id,
      },
    });
  }

  findOneByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },

      data: updateUserDto,
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
