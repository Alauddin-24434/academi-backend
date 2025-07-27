import { Gender } from "../../shared/shared";
import { IUser } from "../User/user.interfcae";

export interface ITeacher {
  id?: string;               
  fullName: string;
  fatherName: string;
  motherName: string;
  phone: string;
  address: string;
  email: string;
  password:string;
  passportPhoto: string;
  gender: Gender;
  dateOfBirth: string;      
  departmentId: string;
  teachingSubjectTitle: string;
  teachingDescription?: string;

  User: IUser | null;  
}
