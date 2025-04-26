import { Router } from 'express';
import {EmployeeController} from "@controllers/employee.controller";
import {validateBodyDto} from "@middlewares/validation/validateDto.middleware";
import {CreateEmployeeDto} from "@entities/dto/employee.dto";
import {EmployeeService} from "@services/employee.service";
const employeeRoutes = Router();


const employeeService = new EmployeeService();
const employeeController = new EmployeeController(employeeService);


// POST /employee/
employeeRoutes.post('/',
    validateBodyDto(CreateEmployeeDto),
    employeeController.create.bind(employeeController)
);

