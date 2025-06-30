
export interface IRegisterUserPayload {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: "STUDENT" | "UNIVERSITY_ADMIN" | "SUPER_ADMIN";
}

export interface ILoginUserPayload {
  email: string;
  password: string;
}
