import { ErrorRequestHandler } from "express";
import ApiError from "@errors/ApiError";
import loggerUtility from "@utils/logger.utility";

export const ErrorHandler: ErrorRequestHandler = (error, req, res, next) => {

    // ApiErrors errors
    if (error instanceof ApiError) {
        loggerUtility.error(`API Error in ${req.method} ${req.originalUrl}: ${error.code} - ${error.message} ///Error trace: ${error.stack ? error.stack : ''}`);
        res.status(error.status).json({
            success: false,
            error: {
                code: error.code,
                message: error.message,
                details: error.details,
            },
        });
        return;
    }

    // Syntax errors
    if (error instanceof SyntaxError && 'body' in error) {
        loggerUtility.error(`Syntax Error in ${req.method} ${req.originalUrl}: ${error.message}\\\Error trace: ${error.stack ? error.stack : ''}`);
        res.status(400).json({
            success: false,
            error: {
                code: "BAD_REQUEST",
                message: "Syntax error occurred.",
            },
        });
        return;
    }

    // Uncaught errors
    loggerUtility.error(`Uncaught Error in ${req.method} ${req.originalUrl}: ${error.code} - ${error.message}\\\Error trace: ${error.stack ? error.stack : ''}`);
    res.status(500).json({
        success: false,
        error: {
            code: "INTERNAL_SERVER_ERROR",
            message: "An unexpected error occurred.",
        },
    });
    return;
};