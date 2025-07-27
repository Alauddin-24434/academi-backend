import { z } from "zod";

const genderEnum = z.enum(["MALE", "FEMALE", "OTHER"]);

export const createTeacherSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  fatherName: z.string().min(1, "Father's name is required"),
  motherName: z.string().min(1, "Mother's name is required"),
  phone: z
    .string().min(11, "Invalid Bangladeshi phone number"),
  address: z.string().min(1, "Address is required"),
  passportPhoto: z.string().optional(),
  gender: genderEnum,
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  departmentId: z.string().min(1, "Department ID is required"),
  teachingSubjectTitle: z.string().min(1, "Teaching subject title is required"),
  teachingDescription: z.string().optional(),

  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password should be at least 6 characters"),
});

export const updateTeacherSchema = createTeacherSchema.partial();
