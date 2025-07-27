import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { ZodError } from "zod";
import { AppError } from "../error/AppError";

// ====================
// Global Error Handler Middleware
// ====================
const globalErrorHandler: ErrorRequestHandler = (
  error: Error,      // The thrown error object
  req: Request,      // Express request object
  res: Response,     // Express response object
  next: NextFunction // Next middleware function (unused here)
) => {
  // Default error response values
  let status = 500;
  let name = "InternalServerError";
  let message = "Something went wrong!";
  // Array to hold detailed validation or error issues for client
  let issue: { path: string; message: string }[] = [];

  // --------------------
  // Handle Zod validation errors
  // --------------------
  if (error instanceof ZodError) {
    status = 400;
    name = "ZodValidationError";
    message = "Validation failed";

    // Extract issues from Zod error, map them to simplified objects
    // with only path and message properties
    const issues = error.issues;

    const extractedSimple = issues.map(err => ({
      path: err.path[0],  // Take first element in path array as string
      message: err.message
    }));

    // Add all extracted issues to the response issue array
    issue.push(...extractedSimple as any);
  }

  // --------------------
  // Handle known Prisma client errors with specific codes
  // --------------------
  else if (error instanceof PrismaClientKnownRequestError) {
    status = 400;
    name = "PrismaClientKnownRequestError";

    switch (error.code) {
      case "P2002":
        // Unique constraint violation (e.g., duplicate email)
        message = `Unique constraint failed on the field(s): ${error.meta?.target || "unknown"}.`;
        issue.push({
          path: String(error.meta?.target || "unknown"),
          message,
        });
        break;

      case "P2025":
        // Record not found error
        message = "Record not found.";
        issue.push({ path: "record", message });
        break;

      default:
        // Fallback for other known Prisma errors
        message = error.message;
        issue.push({ path: "prisma", message });
        break;
    }
  }

  // --------------------
  // Handle Prisma validation errors (e.g., invalid data inputs)
  // --------------------
  else if (error instanceof PrismaClientValidationError) {
    status = 400;
    name = "PrismaClientValidationError";
    message = "Validation error on database input";

    // Parse error message to extract invalid argument names using regex
    const regex = /Argument `(\w+)`/g;
    let match;
    while ((match = regex.exec(error.message)) !== null) {
      issue.push({
        path: match[1], // Field name with invalid input
        message: `Invalid input for field '${match[1]}'`,
      });
    }
  }

  // --------------------
  // Handle other Prisma client errors indicating serious issues
  // --------------------
  else if (error instanceof PrismaClientInitializationError) {
    status = 500;
    name = "PrismaClientInitializationError";
    message = "Failed to initialize database connection";
    issue.push({ path: "prisma", message });
  }
  else if (error instanceof PrismaClientUnknownRequestError) {
    status = 500;
    name = "PrismaClientUnknownRequestError";
    message = "Unknown database error";
    issue.push({ path: "prisma", message });
  }
  else if (error instanceof PrismaClientRustPanicError) {
    status = 500;
    name = "PrismaClientRustPanicError";
    message = "Prisma engine crashed unexpectedly.";
    issue.push({ path: "prisma", message });
  }

  // --------------------
  // Handle custom application errors (your own AppError class)
  // --------------------
  else if (error instanceof AppError) {
    status = error.statusCode || 500;
    name = error.name || "AppError";
    message = error.message;
    issue.push({ path: "general", message });
  }

  // --------------------
  // Handle all other standard JS errors
  // --------------------
  else if (error instanceof Error) {
    name = error.name;
    message = error.message;
    issue.push({ path: "general", message });
  }

  // --------------------
  // Fallback for unknown errors (non-error objects)
  // --------------------
  else {
    issue.push({ path: "general", message });
  }

  // ====================
  // Prepare error response object
  // Includes stack trace if not in production
  // ====================
  const errorResponse = {
    success: false,
    name,
    message,
    issue,
    status,
    stack: process.env.NODE_ENV !== "production" ? error.stack : undefined,
  };

  // Optional: Log error for debugging in development
  // console.error("🔥 Global Error:", errorResponse);

  // Send JSON error response with appropriate HTTP status code
  return res.status(status).json(errorResponse);
};

export default globalErrorHandler;
