import { Sequelize } from "sequelize-typescript";
import dbConfig from "@config/dbConfig";
import Role from "@models/role.model";
import Employee from "@models/employee.model";
import Token from "@models/token.model";
import ProductCategory from "@models/productCategory.model";
import Order from "@models/order.model";
import Product from "@models/product.model";
import Item from "@models/item.model";
import Payment from "@models/payment.model";
import ProductItems from "@models/productItems.model";
import OrderProduct from "@models/orderProducts.model";
import OrderStatus from "@models/orderStatus.model";
import OrderStatusesHistory from "@models/orderStatusesHistory.model";
import Expense from "@models/expense.model";


const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    port: dbConfig.port,
    timezone: dbConfig.timezone,
    dialect: dbConfig.dialect,
    dialectModule: dbConfig.dialectModule,
    pool: dbConfig.pool,
    logging: dbConfig.logging,
    models: dbConfig.models,
});

const db = {
    sequelize,
    Role,
    Expense,
    Employee,
    Token,
    ProductCategory,
    OrderStatus,
    OrderStatusesHistory,
    Order,
    Product,
    Item,
    Payment,
    OrderProduct,
    ProductItems
};

export function openConnection(options?: { logging: boolean }) {
    return sequelize.authenticate(options);
}

export function syncDatabase(options: { force?: boolean; alter?: boolean; logging?: boolean } = {}) {
    return sequelize.sync(options);
}




export function closeConnection() {
    return sequelize.close();
}

export default db;
