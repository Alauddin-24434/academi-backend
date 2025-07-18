import type { Request, Response } from "express"
import type { ApiResponse } from "../interfaces"

export const notFound = (req: Request, res: Response) => {
  const response: ApiResponse = {
    success: false,
    message: `Route ${req.originalUrl} not found`,
  }

  res.status(404).json(response)
}
