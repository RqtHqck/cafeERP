import { Router } from 'express';
import {validateBodyDto} from "@middlewares/validation/validateDto.middleware";
import {CreateEmployeeDto} from "@entities/dto/employee.dto";
import {AdminController} from "@controllers/admin.controller";
import {AdminService} from "@services/admin.service";
const adminRouter = Router();


const adminService = new AdminService();
const adminController = new AdminController(adminService);


// POST /admin/
adminRouter.post('/createEmployee',
    validateBodyDto(CreateEmployeeDto),
    adminController.createEmployee.bind(adminController)
);

export default adminRouter;