export class CreateLeaveDto {
  staffId:  number;
  days: number;
  description?: string;
  from: Date;
  to: Date;
}
