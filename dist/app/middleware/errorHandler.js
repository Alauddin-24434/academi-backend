"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error, req, res, next) => {
    console.error("Error:", error);
    const response = {
        success: false,
        message: error.message || "Internal server error",
        error: process.env.NODE_ENV === "development" ? error.stack : undefined,
    };
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json(response);
};
exports.errorHandler = errorHandler;
