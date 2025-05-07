import logger from '@utils/logger';
import {Dialect} from "sequelize";
import path from "path";
import {IDbConfig} from "@entities/interfaces";
import pg from "pg";



const dbConfig: IDbConfig = {
    database: process.env.POSTGRES_DB!,
    user: process.env.POSTGRES_USER!,
    password: process.env.POSTGRES_PASSWORD!,
    host: process.env.DB_HOST || 'localhost',
    port: 5432,
    timezone: '+03:00',
    dialect: 'postgres',
    dialectModule: pg,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    logging: (msg: string) => logger.info(msg),
    models: [path.resolve(__dirname, '../models')],
}

export default dbConfig;
