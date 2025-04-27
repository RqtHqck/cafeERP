import { Request, Response, NextFunction } from 'express';
import {CreateEmployeeDto, EmployeeDto} from "@entities/dto/employee.dto";
import {plainToInstance} from "class-transformer";
import {EmployeeService} from "@services/employee.service";

export class AdminController {

    private _employeeService: EmployeeService;


    constructor(adminService: EmployeeService) {
        this._employeeService = new EmployeeService();
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
}