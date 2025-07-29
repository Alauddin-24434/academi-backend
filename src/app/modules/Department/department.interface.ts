// interfaces/department.interface.ts

export interface IDepartment {
  id: string;
  name: string;
  code: string;
  description?: string;
  isActive: boolean;
  facultyId: string;
  createdAt: string; // or Date
  updatedAt: string;
}
