import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({ data: createUserDto });
  }

  findAll() {
    // CRUD operations
    return this.prisma.user.findMany();
  }


  findOne(id: number) {
    return this.prisma.user.findFirst({
      where: {
        id: id
      }
    });
  }

  findOneByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: {
        email: email
      }
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
