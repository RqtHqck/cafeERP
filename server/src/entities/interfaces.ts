import {RoleEnum} from "@entities/enums";

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
    quantity: number;
    cost: number;
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