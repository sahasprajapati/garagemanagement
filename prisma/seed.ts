// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import { modelNameGenerator } from './generator';

export enum PermissionAction {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  const role = await prisma.role.upsert({
    where: {
      name: 'super',
    },
    update: {},
    create: {
      name: 'super',
    },
  });

  const subject = await prisma.subject.upsert({
    where: {
      name: 'User',
    },
    update: {},
    create: {
      name: 'User',
    },
  });
  const permission = await prisma.permission.upsert({
    where: {
      permissionIdentifier: {
        subjectId: subject.id,
        action: PermissionAction.Read,
      },
    },
    update: {},
    create: {
      subjectId: subject.id,
      action: PermissionAction.Read,
    },
  });

  const permission_role = await prisma.rolePermission.upsert({
    where: {
      rolePermissionIdentifier: {
        roleId: role.id,
        permissionId: permission.id,
      },
    },
    update: {},
    create: {
      roleId: role.id,
      permissionId: permission.id,
    },
  });

  const superUser = await prisma.user.upsert({
    where: { email: 'super@admin.com' },
    update: {},
    create: {
      email: 'super@admin.com',
      name: 'Super Admin',
      password: 'Hello1@%',
      roleId: role.id,
    },
  });
  console.log({ superUser });

  modelNameGenerator();
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
