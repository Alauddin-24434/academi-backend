export interface IStudent {
  id: string
  userId: string
  studentId?: string
  admissionDate?: Date
  graduationDate?: Date
  status: "PENDING" | "APPROVED" | "SUSPENDED" | "GRADUATED" | "DROPPED" | "TRANSFERRED"
  program?: string
  batch?: string
  section?: string
  cgpa?: number
  totalCredits?: number
  emergencyContact?: string
  guardianName?: string
  guardianPhone?: string
  address?: string
  bloodGroup?: string
  medicalInfo?: any
  extracurriculars?: any
  passportPhoto: string
  achievements?: any
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ICreateStudentInput {
  userId: string
  sessionId: string
  fullName: string
  fatherName: string
  motherName: string
  departmentId: string;
  adress: string;
  passportPhoto: string



}

export interface IUpdateStudentInput {
  program?: string
  batch?: string
  section?: string
  cgpa?: number
  totalCredits?: number
  emergencyContact?: string
  guardianName?: string
  guardianPhone?: string
  passportPhoto: string
  address?: string
  bloodGroup?: string
  medicalInfo?: any
  extracurriculars?: any
  achievements?: any
  isActive?: boolean
}
