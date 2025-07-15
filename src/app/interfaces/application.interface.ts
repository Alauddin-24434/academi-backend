// src/interfaces/application.interface.ts
export interface IApplicationCreatePayload {
  userId: string;
  universityId: string;
  departmentId: string;
  boardName: string;
  registrationNo: string;
  rollNo: string;
  status?: "PENDING" | "WAITING" | "CONFIRMED" | "REJECTED";
  round?: number;
  year: number;
}

export interface IApplication {
  id: string;
  userId: string;
  universityId: string;
  departmentId: string;
  boardName: string;
  registrationNo: string;
  rollNo: string;
  status: "PENDING" | "WAITING" | "CONFIRMED" | "REJECTED";
  round: number;
  year: number;
  createdAt: Date;
}
