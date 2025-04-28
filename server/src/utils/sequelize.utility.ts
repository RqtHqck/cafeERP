import { Sequelize } from "sequelize-typescript";
import dbConfig from "@config/dbConfig";
import Role from "@models/role.model";
import Employee from "@models/employee.model";
import Token from "@models/token.model";


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
    Role,
    Employee,
    Token
};

export default db;
