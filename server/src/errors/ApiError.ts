export default class ApiError extends Error {
    public status: number;
    public code: string;
    public details: string[] | null;

    constructor(
        status: number,
        message: string,
        code: string,
        details: string[] = [],
        originalError?: unknown 
    ) {
        super(message); // message set
        this.name = this.constructor.name; // Class name
        this.status = status; // HTTP-status
        this.code = code; // Codes
        this.details = details.length > 0 ? details : null; // Validation details or else

        // If original error -> set stack 'Caused by'
        if (originalError) {
            const safeError = originalError instanceof Error ? originalError : new Error(String(originalError));
            this.stack += `\nCaused by: ${safeError.stack}`;
        }

        Object.setPrototypeOf(this, new.target.prototype);
    }

    // Error handling particular types of errors
    static validationError(message: string, details: string[] = [], originalError?: unknown) {
        return new ApiError(400, message, "VALIDATION_ERROR", details, originalError);
    }

    static databaseModelError(message?: string, originalError?: unknown) {
        return new ApiError(500, message || "Database model error.", "DATABASE_MODEL_ERROR", [], originalError);
    }

    static databaseError(message?: string, originalError?: unknown) {
        return new ApiError(500, message || "Database request error.", "DATABASE_REQUEST_ERROR", [], originalError);
    }

    static conflictError(message?: string, originalError?: unknown) {
        return new ApiError(409, message || "Conflict error.", "CONFLICT_ERROR", [], originalError);
    }

    static notFoundError(message?: string, originalError?: unknown) {
        return new ApiError(404, message || "The requested resource was not found.", "NOT_FOUND", [], originalError);
    }

    static badRequestError(message: string, originalError?: unknown) {
        return new ApiError(400, message, "BAD_REQUEST", [], originalError);
    }

    static forbiddenError(message: string, originalError?: unknown) {
        return new ApiError(403, message, "FORBIDDEN", [], originalError);
    }

    static internalError(message?: string, originalError?: unknown) {
        return new ApiError(500, message || "An unexpected error occurred.", "INTERNAL_SERVER_ERROR", [], originalError);
    }
}
