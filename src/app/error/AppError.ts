export interface IErrorDetail {
  path: string;
  message: string;
}

export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  public errors: IErrorDetail[];  // multiple issues

  constructor(
    message: string,
    statusCode: number = 500,
    errorName?: string,
    errors: IErrorDetail[] = []  // default empty array
  ) {
    super(message);

    this.name = errorName ?? this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = true;
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }
}
