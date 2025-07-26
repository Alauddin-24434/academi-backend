// User interface (brief)
export interface IUser {
  id: string;
  generateStudentId: string;
  email: string;
  password: string;
  role: "ADMIN" | "STUDENT" | "USER";
  fullName: string;
  pasportPhoto: string;
  createdAt: string;
  updatedAt: string;
  studentId?: string;
}

export interface ILogin {
  email: string;
  password: string;
}