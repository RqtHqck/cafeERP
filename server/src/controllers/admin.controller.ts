import { Request, Response, NextFunction } from 'express';
import {CreateEmployeeDto, EmployeeDto} from "@entities/dto/employee.dto";
import {AdminService} from "@services/admin.service";
import {plainToInstance} from "class-transformer";

export class AdminController {

    private _adminService: AdminService;


    constructor(adminService: AdminService) {
        this._adminService = new AdminService();
    }


    async createEmployee(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const createEmployeeDto = <CreateEmployeeDto>req.body
            const employee = await this._adminService.createEmployee(createEmployeeDto);

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