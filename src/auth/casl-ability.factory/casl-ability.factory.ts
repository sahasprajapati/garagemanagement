import { createMongoAbility, InferSubjects } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { AuthService } from '../auth.service';
import { parseCondition } from '../decorator/perminssion.entity';
import * as MODELS from 'models.json';
export enum PermissionAction {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}


export enum PermissionSubject {
  User =  "User"
}

export type PermissionObjectType = any;
// export type AppAbility = Ability<[PermissionAction, PermissionObjectType]>;
interface CaslPermission {
  action: PermissionAction;
  // In our database, Invoice, Project... are called "object"
  // but in CASL they are called "subject"
  subject: string;
}
@Injectable()
export class CaslAbilityFactory {
  constructor(private authService: AuthService) {}
  async createForUser(user: User) {
    const dbPermissions = await this.authService.findAllPermissionsOfUser(user);
    // const caslPermissions: CaslPermission[] = dbPermissions.map(p => ({
    //   action: p.action as PermissionAction,
    //   subject: p.permissionOject.name,
    // }));

    const rules = dbPermissions.map((permission) => {
      return {
        subject: permission.object.name,
        action: permission.action as PermissionAction,
        conditions: parseCondition(permission.condition, user),
      };
    });

    return createMongoAbility(rules);
    // return new Ability<[PermissionAction, PermissionObjectType]>(caslPermissions);
  }
}

////

// type Subjects = InferSubjects<User> | 'all';

// export type AppAbility = Ability<[Action, Subjects]>;

// @Injectable()
// export class CaslAbilityFactory {
//   createForUser(user: User) {
//     const { can, cannot, build } = new AbilityBuilder<
//       Ability<[Action, Subjects]>
//     >(Ability as AbilityClass<AppAbility>);

//     if (user.isAdmin) {
//       can(Action.Manage, 'all'); // read-write access to everything
//     } else {
//       can(Action.Read, 'all'); // read-only access to everything
//     }

//     can(Action.Update, Article, { authorId: user.id });
//     cannot(Action.Delete, Article, { isPublished: true });

//     return build({
//       // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
//       detectSubjectType: (item) =>
//         item.constructor as ExtractSubjectType<Subjects>,
//     });
//   }
// }
