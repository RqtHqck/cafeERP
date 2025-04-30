// import { Router } from 'express';
// import {EmployeeController} from "@controllers/employee.controller";
// import {validateBodyDto} from "@middlewares/validation/validateDto.middleware";
// import {CreateEmployeeDto} from "@entities/dto/employee.dto";
// import {EmployeeService} from "@services/employee.service";
// const employeeRoutes = Router();
//
//
// const employeeService = new EmployeeService();
// const employeeController = new EmployeeController(employeeService);
//
//
// // POST /employee/
// employeeRoutes.post('/',
//     validateBodyDto(CreateEmployeeDto),
//     employeeController.create.bind(employeeController)
// );
//
import {Router} from 'express';
import {validateBodyDto} from "@middlewares/validation/validateDto.middleware";
import {CreateEmployeeDto} from "@entities/dto/employee.dto";
import {EmployeeController} from "@controllers/employee.controller";
import {EmployeeService} from "@services/employee.service";
import passport from "@middlewares/passport.middleware";
import {roleAccessMiddleware} from "@middlewares/availability/roleAccess.middleware";
import {ItemService} from "@services/item.service";
import {RoleEnum} from "@entities/enums";


const itemService = new ItemService();
const employeeService = new EmployeeService();

const employeeController = new EmployeeController(employeeService);

const adminRouter = Router();

// --------------------EMPLOYEE------------------------------------|
// POST /employee/createEmployee
adminRouter.post('/',
    passport.authenticate("jwt", { session: false }),
    roleAccessMiddleware([RoleEnum.ADMIN]),
    validateBodyDto(CreateEmployeeDto),
    employeeController.createEmployee.bind(employeeController)
);

export default adminRouter;