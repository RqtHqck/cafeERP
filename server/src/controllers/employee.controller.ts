import { Request, Response, NextFunction } from 'express';
import {AdminService} from "@services/admin.service";
import {EmployeeService} from "@services/employee.service";

export class EmployeController {

    private _employeeService: EmployeeService;


    constructor(employeeService: EmployeeService) {
        this._employeeService = new EmployeeService();
    }
}
