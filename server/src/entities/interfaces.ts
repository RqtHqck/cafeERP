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

export interface AuthPayload {
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
    price: number;
    quantity: number;
}

export interface IFeePayload {
    totalPrice: number,
    paymentMethod: PaymentMethodEnum,
    transactionDate?: Date
}

export interface IExpense extends IFeePayload {
    id?: number;
    itemId: number,
    item?: IItem;
}

export interface IExpenseCheck extends IFeePayload {
    itemName: string,
    itemUnit: ItemUnitEnum,
    itemUnitPrice: number,
    itemQuantity: number,
}


// export interface IPayment extends IFeePayload {
//     id?: number;
//     orderId: number,
//     order?: IOrder,
// }

// export interface IPaymentCheck extends IFeePayload {
//
// }

export interface IItemCreatedDto {
    itemId: number,
    price: number;
    quantity: number;
    paymentMethod: PaymentMethodEnum,
}

export interface IProduct {
    id?: number;
    name: string;
    description: string;
    price: number;
    categoryId: number;
}

export interface IProductItem {
    id?: number;
    productId: number;
    itemId: number;
    amount: number;
}

export interface IProductItemDto {
    itemId: number;
    amount: number;
}

export interface IProductItemsResponse {
    productId: number;
    amount: number;
    item: IItem;
}

export interface IItemUpdate extends Partial<IItem> {}