export class AppError extends Error {
    public statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        // Set the prototype explicitly to maintain correct instanceof checks
        Object.setPrototypeOf(this, AppError.prototype);
    }
}
