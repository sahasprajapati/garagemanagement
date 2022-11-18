import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class UserDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty({
    required: false,
  })
  roleId?: number;
}

// Type for FindAll User
export const UserSelect = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  name: true,
  email: true,
  role: {
    select: {
      id: true,
      name: true,
    },
  },
});

export type FindAllUserWithSelect = Prisma.UserGetPayload<{
  select: typeof UserSelect;
}>;
