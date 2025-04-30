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
import {AddItemDto, UpdateItemDto} from "@entities/dto/item.dto";
import {validateParamsId} from "@middlewares/validation/validateId.middleware";


const itemService = new ItemService();
const employeeService = new EmployeeService();

const employeeController = new EmployeeController(itemService, employeeService);

const adminRouter = Router();

// POST /admin/createEmployee
adminRouter.post('/createEmployee',
    passport.authenticate("jwt", { session: false }),
    roleAccessMiddleware([RoleEnum.ADMIN]),
    validateBodyDto(CreateEmployeeDto),
    employeeController.createEmployee.bind(employeeController)
);


// POST /admin/addItem
adminRouter.post('/addItem',
    passport.authenticate("jwt", { session: false }),
    roleAccessMiddleware([RoleEnum.ADMIN, RoleEnum.MANAGER]),
    validateBodyDto(AddItemDto),
    employeeController.addItem.bind(employeeController)
);


// PUT /admin/updateItem/:id
adminRouter.put('/updateItem/:id',
    passport.authenticate("jwt", { session: false }),
    roleAccessMiddleware([RoleEnum.ADMIN, RoleEnum.MANAGER]),
    validateParamsId(),
    validateBodyDto(UpdateItemDto),
    employeeController.patchUpdateItem.bind(employeeController)
);


export default adminRouter;