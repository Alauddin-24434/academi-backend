import type { Request, Response, NextFunction } from "express"

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", error)

  const response = {
    success: false,
    message: error.message || "Internal server error",
    error: process.env.NODE_ENV === "development" ? error.stack : undefined,
  }

  const statusCode = error.statusCode || 500
  res.status(statusCode).json(response)
}
