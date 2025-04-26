import {StatusEnum} from "@entities/enums";

export interface ITask {
    id?: number;
    title: string;
    description: string;
    comment?: string;
    statusId: number;
}

export interface ITaskUpdate extends Partial<ITask> {}

export interface IStatus {
    id?: number;
    name: StatusEnum;
}

export interface IGetAllRequestFilter {
    date?: Date;
    dateFrom?: Date;
    dateTo?: Date;
}
