import {ItemUnitEnum, PaymentMethodEnum, RoleEnum} from "@entities/enums";
import {Transaction} from "sequelize";
import {IsEnum} from "class-validator";

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
    name: string;
}

export interface IRole {
    id?: number;
    name: string;
}

export interface IProductCategory {
    id?: number;
    name: string;
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
    unit: string;
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