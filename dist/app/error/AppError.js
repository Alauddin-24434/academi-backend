"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    constructor(message, statusCode = 500, errorName) {
        super(message);
        // jodi errorName dei, set korbe; na dile class name set korbe
        this.name = errorName !== null && errorName !== void 0 ? errorName : this.constructor.name;
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
