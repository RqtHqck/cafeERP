import { Sequelize } from "sequelize-typescript";
import dbConfig from "@config/dbConfig";


const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    port: dbConfig.port,
    timezone: dbConfig.timezone,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool,
    logging: dbConfig.logging,
    models: dbConfig.models,
});

const db = {
    sequelize,
};

export default db;
