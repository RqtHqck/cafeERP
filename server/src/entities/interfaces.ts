import {StatusEnum} from "@entities/enums";

export interface IEmployee {
    id?: number;
    firstName: string;
    lastName: string;
    roleId: number;
    statusId: number;
}
