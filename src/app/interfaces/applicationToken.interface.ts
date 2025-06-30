export interface IApplicationTokenPayload {
  userId: string;
  round: number;
  amount: number;
  paidAt: Date;
  isValid?: boolean;
}

export interface IApplicationToken extends IApplicationTokenPayload {
  id: string;
}