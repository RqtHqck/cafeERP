import { Router } from 'express';
import {validateBodyDto} from "@middlewares/validation/validateDto.middleware";
import {CreateEmployeeDto} from "@entities/dto/employee.dto";
import {AdminController} from "@controllers/admin.controller";
import {EmployeeService} from "@services/employee.service";
import passport from "@middlewares/passport.middleware";
import {roleAccessMiddleware} from "@middlewares/availability/roleAccess.middleware";
import {ItemService} from "@services/item.service";
import {RoleEnum} from "@entities/enums";


const itemService = new ItemService();
const employeeService = new EmployeeService();

const adminController = new AdminController(itemService, employeeService);

const adminRouter = Router();

// POST /admin/createEmployee
adminRouter.post('/createEmployee',
    passport.authenticate("jwt", { session: false }),
    roleAccessMiddleware([RoleEnum.ADMIN, RoleEnum.MANAGER]),
    validateBodyDto(CreateEmployeeDto),
    adminController.createEmployee.bind(adminController)
);


export default adminRouter;