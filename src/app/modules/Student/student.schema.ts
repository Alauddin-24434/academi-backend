import { z } from "zod";


const genderEnum = z.enum(["MALE", "FEMALE", "OTHER"]);
const studentStatusEnum = z.enum(["PENDING", "APPROVE", "GRADUATED", "SUSPENDED"]);

export const createStudentSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  fatherName: z.string().min(1, "Father's name is required"),
  motherName: z.string().min(1, "Mother's name is required"),
  phone: z
    .string().min(11, "Invalid Bangladeshi phone number"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(1, "Address is required"),
  passportPhoto: z.string().optional(),
  gender: genderEnum,
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  status: studentStatusEnum.optional(),
  sessionId: z.string().min(1, "Session ID is required"),
  departmentId: z.string().min(1, "Department ID is required"),
  password: z.string().min(6, "Password should be at least 6 characters"),
});



export const updateStudentSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  fatherName: z.string().min(1, "Father's name is required"),
  motherName: z.string().min(1, "Mother's name is required"),
  phone: z
    .string().min(11, "Invalid Bangladeshi phone number"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(1, "Address is required"),
  passportPhoto: z.string().optional(),
  gender: genderEnum,
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  status: studentStatusEnum.optional(),
  sessionId: z.string().min(1, "Session ID is required"),
  departmentId: z.string().min(1, "Department ID is required"),
  password: z.string().min(6, "Password should be at least 6 characters"),
});
