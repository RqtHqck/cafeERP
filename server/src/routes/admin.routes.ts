import { Router } from 'express';
import {validateBodyDto} from "@middlewares/validation/validateDto.middleware";
import {CreateEmployeeDto} from "@entities/dto/employee.dto";
import {AdminController} from "@controllers/admin.controller";
import {AdminService} from "@services/admin.service";
import {EmployeeService} from "@services/employee.service";
const adminRouter = Router();


const adminService = new AdminService();
const employeeService = new EmployeeService();

const adminController = new AdminController(adminService, employeeService);


// POST /admin/
adminRouter.post('/createEmployee',
    validateBodyDto(CreateEmployeeDto),
    adminController.createEmployee.bind(adminController)
);

export default adminRouter;