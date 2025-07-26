import { IPayment } from "../Payment/payment.interface";
import { IUser } from "../User/user.interfcae";

// enums
export type Gender = "MALE" | "FEMALE" | "OTHER";
export type StudentStatus = "PENDING" | "APPROVE" | "GRADUATED" | "SUSPENDED";

// Student interface
export interface IStudent {
  id: string;
  generateStudentId: string;
  fullName: string;
  fatherName: string;
  motherName: string;
  phone: string;
  address: string;
  passportPhoto: string;
  gender: Gender;
  dateOfBirth: string;
  status: StudentStatus;
  createdAt: string;
  updatedAt: string;
  sessionId: string;
  departmentId: string;
  email: string;
  password: string,

  // Relations
  payments: IPayment[];
  User: IUser[];
  AcademicInfo?: AcademicInfo;
}

// AcademicInfo interface
export interface AcademicInfo {
  id: string;
  registrationNumber: string;
  rollNumber: string;
  session: string;
  generateStudentId: string;
  createdAt: string;
  updatedAt: string;
}

