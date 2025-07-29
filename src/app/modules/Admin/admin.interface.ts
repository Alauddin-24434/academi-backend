// interfaces/admin.interface.ts

export interface IAdmin {
  id: string;
  userId: string;
  permissions?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateAdminInput {
  userId: string;
  permissions?: Record<string, any>;
}
