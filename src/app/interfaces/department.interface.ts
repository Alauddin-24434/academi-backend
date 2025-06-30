export interface IDepartmentCreatePayload {
  name: string;
  code: string;
  seatCapacity: number;
  universityId: string;
}

export interface IDepartment extends IDepartmentCreatePayload {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}