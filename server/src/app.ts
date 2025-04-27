import "module-alias/register";
import "@config/dotenv";
import {loggingAfter, loggingBefore} from "@middlewares/logging.middleware";

import express, { Application } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import logger from "@utils/logger";
import routes from "@routes/index";
import {ErrorHandler} from "@middlewares/errorHanlder.middleware";

const app: Application = express();
app
    .use(bodyParser.json({ strict: true }))
    .use(bodyParser.urlencoded({ extended: true }))
    .use(morgan("combined", { stream: logger.stream }))
    .use(compression())
    .use(helmet())
    .use(cors())
    .use(loggingBefore)
    .use('/api/v1/', routes)
    .use(loggingAfter)
    .use(ErrorHandler);

export default app;