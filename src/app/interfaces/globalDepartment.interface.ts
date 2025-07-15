
export enum DepartmentCategory {
  SCIENCE = "SCIENCE",
  HUMANITIES = "HUMANITIES",
  COMMERCE = "COMMERCE",
}


export interface IGlobalDepartmentCreatePayload {
  name: string;
  code: string;
  seatCapacity: number;
  universityId: string;
  category: DepartmentCategory;
}


export interface IGlobalDepartment extends IGlobalDepartmentCreatePayload {
  id: string;
  createdAt: string;  
  updatedAt: string;
}
