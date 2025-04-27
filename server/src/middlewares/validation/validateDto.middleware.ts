import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import ApiError from '@errors/ApiError';
import logger from "@utils/logger";

export const validateBodyDto = (dtoClass: any) => {
    logger.info("Validate dto")

    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            // Dto to class validator dto object
            const dtoInstance = plainToInstance(dtoClass, req.body);
            // Catch errors
            const errors = await validate(dtoInstance, { whitelist: true, forbidNonWhitelisted: true });

            if (errors.length > 0) {
                // Array of errors
                const errorMessages = errors.flatMap(err =>
                    Object.values(err.constraints || []).map(constraint => `${err.property}: ${constraint}`)
                );

                return next(ApiError.validationError(
                    "Validation failed for the provided input.",
                    errorMessages
                ));
            }

            next();
        } catch (error) {
            next(error);
        }
    };
};