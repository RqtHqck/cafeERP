import {StatusEnum} from "@entities/enums";

export interface IEmployee {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
    hashSalt: string;
    roleId: number;
}

export interface IRole {
    id?: number;
    name: string;
}



export interface AuthPayload {
    id: string;
    email: string;
}