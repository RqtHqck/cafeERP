import { Request, Response, NextFunction } from 'express';
import {EmployeeService} from "@services/employee.service";
import {CreateEmployeeDto, EmployeeDto} from "@entities/dto/employee.dto";
import {plainToInstance} from "class-transformer";
import {AddItemDto, ItemDto} from "@entities/dto/item.dto";
import {ItemService} from "@services/item.service";

export class EmployeeController {

    private _employeeService: EmployeeService;

    constructor(employeeService: EmployeeService) {
        this._employeeService = employeeService;
    }


    async createEmployee(req: Request, res: Response, next: NextFunction): Promise<Response<EmployeeDto> | void> {
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
}
