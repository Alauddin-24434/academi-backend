export enum OAuthProvider {
  CUSTOM = "CUSTOM",
  GOOGLE = "GOOGLE",
  GITHUB = "GITHUB",
  FACEBOOK = "FACEBOOK",
}

export interface IRegisterUserPayload {
  name: string;
  email: string;
  password: string;
  method: OAuthProvider;  // method must be one of OAuthProvider enum
  phone?: string;
  role?: "STUDENT" | "UNIVERSITY_ADMIN" | "SUPER_ADMIN";
}

export interface ILoginUserPayload {
  email: string;
  password: string;
}

export interface IOAuthUserInfo {
  email: string;
  name: string;
  avatar?: string | null;
  phone?: string | null;
}
