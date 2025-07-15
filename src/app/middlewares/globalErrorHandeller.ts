import { Request, Response, NextFunction } from "express";
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let status = error.statusCode || 500;
  let message = error.message || "Something went wrong!";
  let name = error.name || "InternalServerError";

  // === Prisma Errors Handling ===
  if (error instanceof PrismaClientInitializationError) {
    status = 500;
    name = "PrismaClientInitializationError";
    message =
      "Failed to initialize database connection. Please check your database server or connection string.";
  } else if (error instanceof PrismaClientKnownRequestError) {
  status = 400;
  name = "PrismaClientKnownRequestError";

  switch (error.code) {
    case "P2002":
      message = `Unique constraint failed on the field(s): ${error.meta?.target || "unknown"}.`;
      break;
    case "P2025":
      message = `Record not found.`;
      break;
    default:
      // ডিফল্ট মেসেজ থেকে column বা ফিল্ড নাম বের করার চেষ্টা
      const colRegex = /The column `(\w+)` does not exist/;
      const match = colRegex.exec(error.message);

      if (match && match[1]) {
        message = `❌ Invalid field '${match[1]}' does not exist in the database. Please check your input.`;
      } else {
        message = error.message;
      }
  }
}
 else if (error instanceof PrismaClientValidationError) {
    status = 400;
    name = "PrismaClientValidationError";

    const errorMessage = error.message;
    const regex = /Argument `(\w+)`/g;
    const fields: string[] = [];
    let match;

    while ((match = regex.exec(errorMessage)) !== null) {
      if (match[1] && !fields.includes(match[1])) {
        fields.push(match[1]);
      }
    }

    if (fields.length > 0) {
      message = `❌ Invalid input in field(s): ${fields.join(", ")}. Please check their types.`;
    } else {
      message = "❌ Validation error: One or more fields are invalid.";
    }
  } else if (error instanceof PrismaClientUnknownRequestError) {
    status = 500;
    name = "PrismaClientUnknownRequestError";
    message =
      "An unknown database error occurred. Please try again later or contact support.";
  } else if (error instanceof PrismaClientRustPanicError) {
    status = 500;
    name = "PrismaClientRustPanicError";
    message =
      "Prisma engine crashed unexpectedly. Please try restarting the server or update Prisma.";
  }

  // === Other (Non-Prisma) errors can be handled here ===
  console.log({
    success: false,
    name,
    message,
    status,
    stack: process.env.NODE_ENV !== "production" ? error.stack : undefined,
  })
  res.status(status).json({
    success: false,
    name,
    message,
    status,
    stack: process.env.NODE_ENV !== "production" ? error.stack : undefined,
  });
};

export default globalErrorHandler;
