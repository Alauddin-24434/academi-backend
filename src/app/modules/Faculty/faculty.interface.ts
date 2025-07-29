// interfaces/faculty.interface.ts

export interface IFaculty {
  id: string;
  name: string;
  code: string;
  description?: string;
  isActive: boolean;
  createdAt: string; // or Date, depending on usage
  updatedAt: string;
}
