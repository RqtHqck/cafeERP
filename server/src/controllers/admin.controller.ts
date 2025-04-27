import { Request, Response, NextFunction } from 'express';
import {CreateEmployeeDto, EmployeeDto} from "@entities/dto/employee.dto";
import {plainToInstance} from "class-transformer";
import {EmployeeService} from "@services/employee.service";
import {AdminService} from "@services/admin.service";

export class AdminController {

    private _employeeService: EmployeeService;
    private _adminService: AdminService;

    constructor(adminService: AdminService, employeeService: EmployeeService) {
        this._employeeService = employeeService;
        this._adminService = adminService;

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