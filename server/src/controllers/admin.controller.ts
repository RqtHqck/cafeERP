import { Request, Response, NextFunction } from 'express';
import db from "@utils/sequelize.utility";
import {EmployeeService} from "@services/employee.service";
import {CreateEmployeeDto} from "@entities/dto/employee.dto";
import {AdminService} from "@services/admin.service";

export class AdminController {

    private _adminService: AdminService;


    constructor(adminService: AdminService) {
        this._adminService = new AdminService();
    }


    async createEmployee(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const createEmployeeDto = <CreateEmployeeDto>req.body
            const employee = await this._adminService.createEmployee(createEmployeeDto);
            return res
                .status(201)
                .json(employee)
        } catch (error) {
            next(error);
        }
    }
}