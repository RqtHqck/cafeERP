import {ItemUnitEnum, OrderStatusEnum, PaymentMethodEnum, ProductCategoryEnum, RoleEnum} from "@entities/enums";
import {Dialect} from "sequelize";
import pg from "pg";

export interface IDbConfig {
    database: string;
    user: string;
    password: string;
    host: string;
    port: number;
    timezone: string;
    dialect: Dialect;
    dialectModule: typeof pg,
    pool: {
        max: number;
        min: number;
        acquire: number;
        idle: number;
    };
    logging: (msg: string) => any;
    models: string[];
}

export interface IEmployee {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
    hashSalt: string;
    roleId: number;
}

export interface  IOrderStatus {
    id?: number;
    name: OrderStatusEnum;
}

export interface IRole {
    id?: number;
    name: RoleEnum;
}

export interface IProductCategory {
    id?: number;
    name: ProductCategoryEnum;
}

export interface IAuthPayload {
    employeeId: number;
    email: string;
    roleId: number;
}

export interface IToken {
    id?: number;
    employeeId: number;
    refreshToken: string;
}

export interface IItem {
    id?: number;
    name: string;
    unit: ItemUnitEnum;
    unitPrice: number;
    quantity: number;
}

export interface IOrder {
    id?: number;
    customerName: string;
    price: number;
    employeeId: number;
    statusId: number;
}

export interface IProduct {
    id?: number;
    name: string;
    description: string;
    price: number;
    categoryId: number;
    available?: boolean;
}

export interface IProductItem {
    id?: number;
    productId: number;
    itemId: number;
    quantity: number;
    item?: IItem;
    product?: IProduct;
}

export interface IOrderProduct {
    id?: number;
    productId: number;
    orderId: number;
    quantity: number;
    order?: IOrder;
    product?: IProduct;
}

export interface IOrderStatusHistory {
    orderId: number;
    statusId: number;
}

export interface IFeePayload {
    id?: number;
    totalPrice: number,
    paymentMethod: PaymentMethodEnum,
    transactionDate?: Date
}

export interface IExpense extends IFeePayload {
    itemId: number,
    item?: IItem;
}

export interface IPayment extends IFeePayload {
    orderId: number,
    order?: IOrder,
}

export interface IExpenseCheck extends IFeePayload {
    itemName: string,
    itemUnit: ItemUnitEnum,
    itemUnitPrice: number,
    itemQuantity: number,
}

export interface IPaymentCheck extends IFeePayload {
    productName: string,
    productQuantity: number,
    productUnitPrice: number,
}

export interface IItemUpdate extends Partial<IItem> {}