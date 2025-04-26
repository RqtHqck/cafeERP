import loggerUtility from "@utils/logger.utility";
import {NextFunction, Request, Response} from "express";


export const loggingBefore = (req: Request, res: Response, next: NextFunction) => {
    loggerUtility.info(`Request: ${req.method} ${req.originalUrl}`);
    loggerUtility.info(`Headers: ${JSON.stringify(req.headers)}`);
    loggerUtility.info(`Query params: ${JSON.stringify(req.query)}`);
    loggerUtility.info(`Params: ${JSON.stringify(req.params)}`);
    loggerUtility.info(`Body: ${JSON.stringify(req.body)}`);
    next();
};

export const loggingAfter = (req: Request, res: Response, next: NextFunction) => {
    loggerUtility.info(`Response: ${req.method} ${req.originalUrl}`);
    loggerUtility.info(`Status: ${res.statusCode}`);
    next();
}