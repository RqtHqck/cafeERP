import logger from "@utils/logger";
import {NextFunction, Request, Response} from "express";
import ApiError from "@errors/ApiError";

export const validateParamsId = () => {
    logger.info("validateParamsId")

    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const id = parseInt(req.params.id as string, 10);

        if (isNaN(id)) {
            throw ApiError.badRequestError('Id must be type of integer')
        }

        next();
    }
}