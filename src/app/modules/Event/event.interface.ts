export enum EventStatus {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
}

export interface IEvent {
  name: string;
  description: string;
  date: string;         // ISO datetime string
  images: string[];     // empty array by default
  status?: EventStatus; // optional, default PENDING
  createdAt?: string;   // ISO datetime string
  updatedAt?: string;   // ISO datetime string
}
