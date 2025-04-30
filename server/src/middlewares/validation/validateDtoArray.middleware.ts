import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import ApiError from '@errors/ApiError';
import logger from "@utils/logger";

export const validateBodyArrayDto = (dtoClass: any) => {
    logger.info("validateBodyArrayDto");

    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            // Check ifArray
            if (!Array.isArray(req.body)) {
                return next(ApiError.validationError(
                    "Validation failed: expected an array.",
                    ["Request body must be an array."]
                ));
            }

            const validationErrors: string[] = [];

            // Async rearrange object in array
            for (const [index, item] of req.body.entries()) {
                const dtoInstance = plainToInstance(dtoClass, item);
                const errors = await validate(dtoInstance, {
                    whitelist: true,
                    forbidNonWhitelisted: true
                });

                if (errors.length > 0) {
                    errors.forEach(err => {
                        const constraints = err.constraints || {};
                        for (const message of Object.values(constraints)) {
                            validationErrors.push(`[Item ${index}]: ${err.property} - ${message}`);
                        }
                    });
                }
            }

            //
            if (validationErrors.length > 0) {
                return next(ApiError.validationError(
                    "Validation failed for one or more items",
                    validationErrors
                ));
            }

            next();
        } catch (error) {
            next(error);
        }
    };
};