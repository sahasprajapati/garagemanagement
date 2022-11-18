import { PermissionRelations as _PermissionRelations } from './permission_relations';
import { SubjectRelations as _SubjectRelations } from './subject_relations';
import { RolePermissionRelations as _RolePermissionRelations } from './role_permission_relations';
import { RoleRelations as _RoleRelations } from './role_relations';
import { UserRelations as _UserRelations } from './user_relations';
import { StaffRelations as _StaffRelations } from './staff_relations';
import { StaffDesignationRelations as _StaffDesignationRelations } from './staff_designation_relations';
import { AttendanceRelations as _AttendanceRelations } from './attendance_relations';
import { LeaveRelations as _LeaveRelations } from './leave_relations';
import { Permission as _Permission } from './permission';
import { Subject as _Subject } from './subject';
import { RolePermission as _RolePermission } from './role_permission';
import { Role as _Role } from './role';
import { User as _User } from './user';
import { Staff as _Staff } from './staff';
import { StaffDesignation as _StaffDesignation } from './staff_designation';
import { Attendance as _Attendance } from './attendance';
import { Leave as _Leave } from './leave';

export namespace PrismaModel {
  export class PermissionRelations extends _PermissionRelations {}
  export class SubjectRelations extends _SubjectRelations {}
  export class RolePermissionRelations extends _RolePermissionRelations {}
  export class RoleRelations extends _RoleRelations {}
  export class UserRelations extends _UserRelations {}
  export class StaffRelations extends _StaffRelations {}
  export class StaffDesignationRelations extends _StaffDesignationRelations {}
  export class AttendanceRelations extends _AttendanceRelations {}
  export class LeaveRelations extends _LeaveRelations {}
  export class Permission extends _Permission {}
  export class Subject extends _Subject {}
  export class RolePermission extends _RolePermission {}
  export class Role extends _Role {}
  export class User extends _User {}
  export class Staff extends _Staff {}
  export class StaffDesignation extends _StaffDesignation {}
  export class Attendance extends _Attendance {}
  export class Leave extends _Leave {}

  export const extraModels = [
    PermissionRelations,
    SubjectRelations,
    RolePermissionRelations,
    RoleRelations,
    UserRelations,
    StaffRelations,
    StaffDesignationRelations,
    AttendanceRelations,
    LeaveRelations,
    Permission,
    Subject,
    RolePermission,
    Role,
    User,
    Staff,
    StaffDesignation,
    Attendance,
    Leave,
  ];
}
