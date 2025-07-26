export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = 500, errorName?: string) {
    super(message);

    // jodi errorName dei, set korbe; na dile class name set korbe
    this.name = errorName ?? this.constructor.name;

    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
