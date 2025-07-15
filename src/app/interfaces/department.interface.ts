export interface IDepartmentCreatePayload {
  name: string;
  code: string;
  seatCapacity: number;
  universityId: string;
 category: "SCIENCE" | "HUMANITIES" | "COMMERCE";
}

export interface IDepartment extends IDepartmentCreatePayload {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}