export interface IUniversityCreatePayload {
  name: string;
  code: string;
  location: string;
  email?: string;
  phone?: string;
  logoUrl?: string;
  websiteUrl?: string;
  applicationFee?: number;
  type: "PUBLIC" | "PRIVATE" | "INTERNATIONAL";
  isActive?: boolean;
}

export interface IUniversity {
  id: string;
  name: string;
  code: string;
  location: string;
  email?: string;
  phone?: string;
  logoUrl?: string;
  websiteUrl?: string;
  applicationFee?: number;
  type: "PUBLIC" | "PRIVATE" | "INTERNATIONAL";
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
