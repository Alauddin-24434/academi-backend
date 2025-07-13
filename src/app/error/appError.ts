export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(statusCode: number, message: string, name?: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = name || "Error";
    this.isOperational = true;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
