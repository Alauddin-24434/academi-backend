import { Decimal } from "@prisma/client/runtime/library"

export interface IPayment {
  id: string
  userId: string
  paymentTypeId: string
  amount: Decimal
  status: "PENDING" | "COMPLETE" | "FAILED" | "CANCELED" | "REFUNDED"
  paymentDate?: Date
  dueDate?: Date
  transactionId: string
  paymentMethod?: "CASH" | "BANK_TRANSFER" | "MOBILE_BANKING" | "CARD" | "ONLINE"
  reference?: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface ICreatePaymentInput {
  userId: string
  paymentTypeId: string
  paymentDate: Date
  amount: number
  paymentMethod: "CASH" | "BANK_TRANSFER" | "MOBILE_BANKING" | "CARD" | "ONLINE"
  transactionId: string
}

export interface IUpdatePaymentInput {
  amount?: number
  status?: "PENDING" | "COMPLETE" | "FAILED" | "CANCELED" | "REFUNDED"
  paymentDate?: Date
  dueDate?: Date
  transactionId?: string
  paymentMethod?: "CASH" | "BANK_TRANSFER" | "MOBILE_BANKING" | "CARD" | "ONLINE"
  reference?: string
  notes?: string
}

export interface IPaymentType {
  id: string;
  name: string;
  description?: string;
  amount: Decimal;
  isActive?: boolean;
  isOneTime?: boolean;
  features?: string[]; // you can be more specific e.g., `string[]` if it's an array of strings
  label?: string;
  createdAt?: string;
  updatedAt?: string;
}

