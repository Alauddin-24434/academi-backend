
// Payment interface (brief)
export interface IPayment {
  transactionId: string;
  amount: number;
  status : "COMPLETE" | "PENDING" | "CANCELED" | "FAILED";
  paymentDate: string;
  description?: string;
  studentId?: string;
  createdAt: string;
  updatedAt: string;
}
