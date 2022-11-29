import { PermissionRelations as _PermissionRelations } from './permission_relations';
import { SubjectRelations as _SubjectRelations } from './subject_relations';
import { RolePermissionRelations as _RolePermissionRelations } from './role_permission_relations';
import { RoleRelations as _RoleRelations } from './role_relations';
import { UserRelations as _UserRelations } from './user_relations';
import { StaffRelations as _StaffRelations } from './staff_relations';
import { StaffDesignationRelations as _StaffDesignationRelations } from './staff_designation_relations';
import { AttendanceRelations as _AttendanceRelations } from './attendance_relations';
import { LeaveRelations as _LeaveRelations } from './leave_relations';
import { CustomerRelations as _CustomerRelations } from './customer_relations';
import { TransactionRelations as _TransactionRelations } from './transaction_relations';
import { VehicleRelations as _VehicleRelations } from './vehicle_relations';
import { VehicleBrandRelations as _VehicleBrandRelations } from './vehicle_brand_relations';
import { VehicleTypeRelations as _VehicleTypeRelations } from './vehicle_type_relations';
import { VehicleWheelerTypeRelations as _VehicleWheelerTypeRelations } from './vehicle_wheeler_type_relations';
import { ServiceRelations as _ServiceRelations } from './service_relations';
import { Permission as _Permission } from './permission';
import { Subject as _Subject } from './subject';
import { RolePermission as _RolePermission } from './role_permission';
import { Role as _Role } from './role';
import { User as _User } from './user';
import { Staff as _Staff } from './staff';
import { StaffDesignation as _StaffDesignation } from './staff_designation';
import { Attendance as _Attendance } from './attendance';
import { Leave as _Leave } from './leave';
import { Customer as _Customer } from './customer';
import { Transaction as _Transaction } from './transaction';
import { Vehicle as _Vehicle } from './vehicle';
import { VehicleBrand as _VehicleBrand } from './vehicle_brand';
import { VehicleType as _VehicleType } from './vehicle_type';
import { VehicleWheelerType as _VehicleWheelerType } from './vehicle_wheeler_type';
import { Service as _Service } from './service';

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
  export class CustomerRelations extends _CustomerRelations {}
  export class TransactionRelations extends _TransactionRelations {}
  export class VehicleRelations extends _VehicleRelations {}
  export class VehicleBrandRelations extends _VehicleBrandRelations {}
  export class VehicleTypeRelations extends _VehicleTypeRelations {}
  export class VehicleWheelerTypeRelations extends _VehicleWheelerTypeRelations {}
  export class ServiceRelations extends _ServiceRelations {}
  export class Permission extends _Permission {}
  export class Subject extends _Subject {}
  export class RolePermission extends _RolePermission {}
  export class Role extends _Role {}
  export class User extends _User {}
  export class Staff extends _Staff {}
  export class StaffDesignation extends _StaffDesignation {}
  export class Attendance extends _Attendance {}
  export class Leave extends _Leave {}
  export class Customer extends _Customer {}
  export class Transaction extends _Transaction {}
  export class Vehicle extends _Vehicle {}
  export class VehicleBrand extends _VehicleBrand {}
  export class VehicleType extends _VehicleType {}
  export class VehicleWheelerType extends _VehicleWheelerType {}
  export class Service extends _Service {}

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
    CustomerRelations,
    TransactionRelations,
    VehicleRelations,
    VehicleBrandRelations,
    VehicleTypeRelations,
    VehicleWheelerTypeRelations,
    ServiceRelations,
    Permission,
    Subject,
    RolePermission,
    Role,
    User,
    Staff,
    StaffDesignation,
    Attendance,
    Leave,
    Customer,
    Transaction,
    Vehicle,
    VehicleBrand,
    VehicleType,
    VehicleWheelerType,
    Service,
  ];
}
