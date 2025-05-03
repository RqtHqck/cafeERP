import {Router} from 'express';
import {validateBodyDto} from "@middlewares/validation/validateDto.middleware";
import {CreateEmployeeDto} from "@entities/dto/employee.dto";
import {EmployeeController} from "@controllers/employee.controller";
import {EmployeeService} from "@services/employee.service";
import passport from "@middlewares/passport.middleware";
import {roleAccessMiddleware} from "@middlewares/availability/roleAccess.middleware";
import {RoleEnum} from "@entities/enums";


const employeeService = new EmployeeService();

const employeeController = new EmployeeController(employeeService);

const employeeRoutes = Router();


// POST /employees/
employeeRoutes.post('/',
    passport.authenticate("jwt", { session: false }),
    roleAccessMiddleware([RoleEnum.ADMIN]),
    validateBodyDto(CreateEmployeeDto),
    employeeController.createEmployee.bind(employeeController)
);

export default employeeRoutes;