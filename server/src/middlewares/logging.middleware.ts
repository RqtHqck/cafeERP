import logger from "@utils/logger";
import {NextFunction, Request, Response} from "express";


export const loggingBefore = (req: Request, res: Response, next: NextFunction) => {
    logger.info(`Request: ${req.method} ${req.originalUrl}`);
    logger.info(`Headers: ${JSON.stringify(req.headers)}`);
    logger.info(`Query params: ${JSON.stringify(req.query)}`);
    logger.info(`Params: ${JSON.stringify(req.params)}`);
    logger.info(`Body: ${JSON.stringify(req.body)}`);
    next();
};

export const loggingAfter = (req: Request, res: Response, next: NextFunction) => {
    logger.info(`Response: ${req.method} ${req.originalUrl}`);
    logger.info(`Status: ${res.statusCode}`);
    next();
}