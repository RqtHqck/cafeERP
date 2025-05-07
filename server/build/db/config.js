require("../../dist/config/dotenv");
// Using for db connection

const config = {
    dev: {
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        host: process.env.DB_HOST,
        dialect: 'postgres'
    }
};

module.exports = config;