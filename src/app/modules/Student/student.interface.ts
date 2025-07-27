import { Gender } from "../../../../generated/prisma";
import { StudentStatus } from "../../shared/shared";
import { IPayment } from "../Payment/payment.interface";
import { IUser } from "../User/user.interfcae";



export interface IStudent {
  id: string;
  fullName: string;
  fatherName: string;
  motherName: string;
  phone: string;
  address: string;
  passportPhoto: string;
  gender: Gender;
  dateOfBirth: string;
  status: StudentStatus;
  createdAt: string;  // ISO date string
  updatedAt: string;  // ISO date string
  sessionId: string;
  departmentId: string;
  email: string;       
  password: string; 

  // Relations
  payments: IPayment[];     
  User: IUser | null;      

}
