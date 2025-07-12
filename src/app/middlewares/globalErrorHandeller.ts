import { Request, Response, NextFunction } from 'express';

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = error.statusCode || 500;
  const message = error.message || 'Something went wrong!';

  res.status(status).json({
    success: false,
    message,
    errorDetails:
      process.env.NODE_ENV !== 'production' ? error.stack : undefined,
  });
};

export default globalErrorHandler;
