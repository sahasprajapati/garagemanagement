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
  // create two dummy articles
  const post1 = await prisma.article.upsert({
    where: { title: 'Prisma Adds Support for MongoDB' },
    update: {},
    create: {
      title: 'Prisma Adds Support for MongoDB',
      body: 'Support for MongoDB has been one of the most requested features since the initial release of...',
      description:
        "We are excited to share that today's Prisma ORM release adds stable support for MongoDB!",
      published: false,
    },
  });

  const post2 = await prisma.article.upsert({
    where: { title: "What's new in Prisma? (Q1/22)" },
    update: {},
    create: {
      title: "What's new in Prisma? (Q1/22)",
      body: 'Our engineers have been working hard, issuing new releases with many improvements...',
      description:
        'Learn about everything in the Prisma ecosystem and community from January to March 2022.',
      published: true,
    },
  });

  const role = await prisma.role.upsert({
    where: {
      name: 'admin',
    },
    update: {},
    create: {
      name: 'admin',
    },
  });

  const object = await prisma.object.upsert({
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
        objectId: object.id,
        action: PermissionAction.Read,
      },
    },
    update: {},
    create: {
      objectId: object.id,
      action: PermissionAction.Read,
    },
  });

  const permission_role = await prisma.role_Permission.upsert({
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
  console.log({ post1, post2, superUser });

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
