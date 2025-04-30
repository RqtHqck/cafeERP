import { Request, Response, NextFunction } from 'express';
import {AdminService} from "@services/admin.service";
import {EmployeeService} from "@services/employee.service";
import {CreateEmployeeDto, EmployeeDto} from "@entities/dto/employee.dto";
import {plainToInstance} from "class-transformer";
import {AddItemDto, ItemDto} from "@entities/dto/item.dto";
import {ItemService} from "@services/item.service";

export class EmployeeController {

    private _employeeService: EmployeeService;
    private _itemService: ItemService;

    constructor(itemService: ItemService, employeeService: EmployeeService) {
        this._employeeService = employeeService;
        this._itemService = itemService;
    }


    async createEmployee(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const createEmployeeDto = <CreateEmployeeDto>req.body
            const employee = await this._employeeService.createEmployee(createEmployeeDto);

            const responseEmployee = plainToInstance(EmployeeDto, employee, {
                excludeExtraneousValues: true,
            });

            return res
                .status(201)
                .json(responseEmployee)
        } catch (error) {
            next(error);
        }
    }


    async addItem(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const addItemDto = <AddItemDto>req.body
            const item = await this._itemService.addItems(addItemDto);

            const responseItem = plainToInstance(ItemDto, item, {
                excludeExtraneousValues: true,
            });

            return res
                .status(201)
                .json(responseItem)
        } catch (error) {
            next(error);
        }
    }


    async patchUpdateItem(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const id = parseInt(req.params.id as string, 10);

            const addItemDto = <AddItemDto>req.body
            const item = await this._itemService.updateItem(id, addItemDto);

            const responseItem = plainToInstance(ItemDto, item, {
                excludeExtraneousValues: true,
            });

            return res
                .status(201)
                .json(responseItem)
        } catch (error) {
            next(error);
        }
    }
}
