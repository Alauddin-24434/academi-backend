export interface IPaymentCreatePayload {
  userId: string;
  applicationId?: string;
  amount: number;
  type: "APPLICATION" | "ADMISSION";
  status: "PENDING" | "SUCCESS" | "FAILED";
  transactionId: string;
  round?: number;
  paidAt?: Date;
}

export interface IPayment extends IPaymentCreatePayload {
  id: string;
  createdAt: Date;
}