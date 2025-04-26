import dotenv from 'dotenv';
import path from 'path';
import loggerUtility from "@utils/logger.utility";

const envPath = path.join(__dirname, '../../.env.' + (process.env.NODE_ENV));
dotenv.config({ path: envPath });

loggerUtility.info(`Environment set as ${process.env.NODE_ENV}`)

export default dotenv;
