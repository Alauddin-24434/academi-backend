import { Request, Response, NextFunction } from 'express';

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = error.statusCode || 500;
  const message = error.message || 'Something went wrong!';
  const name = error.name || error.name || 'InternalServerError';

  console.log({
    status: status,
    message: message,
    name: name,
  })

  res.status(status).json({
    success: false,
    name,
    message,
    status,
    stack: process.env.NODE_ENV !== 'production' ? error.stack : undefined,
  });
};

export default globalErrorHandler;
