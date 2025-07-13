import { Request, Response, NextFunction } from 'express';

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Something went wrong!';
  const errName = error.name || error.name || 'InternalServerError';

  res.status(statusCode).json({
    success: false,
    errName,
    message,
    statusCode,
    errorDetails: process.env.NODE_ENV !== 'production' ? error.stack : undefined,
  });
};

export default globalErrorHandler;
