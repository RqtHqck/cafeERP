import {Router} from 'express';
import {validateBodyDto} from "@middlewares/validation/validateDto.middleware";
import {CreateEmployeeDto} from "@entities/dto/employee.dto";
import {AdminController} from "@controllers/admin.controller";
import {EmployeeService} from "@services/employee.service";
import passport from "@middlewares/passport.middleware";
import {roleAccessMiddleware} from "@middlewares/availability/roleAccess.middleware";
import {ItemService} from "@services/item.service";
import {RoleEnum} from "@entities/enums";
import {AddItemDto, UpdateItemDto} from "@entities/dto/item.dto";
import {validateParamsId} from "@middlewares/validation/validateId.middleware";


const itemService = new ItemService();
const employeeService = new EmployeeService();

const adminController = new AdminController(itemService, employeeService);

const adminRouter = Router();

// POST /admin/createEmployee
adminRouter.post('/createEmployee',
    passport.authenticate("jwt", { session: false }),
    roleAccessMiddleware([RoleEnum.ADMIN]),
    validateBodyDto(CreateEmployeeDto),
    adminController.createEmployee.bind(adminController)
);


// POST /admin/addItem
adminRouter.post('/addItem',
    passport.authenticate("jwt", { session: false }),
    roleAccessMiddleware([RoleEnum.ADMIN, RoleEnum.MANAGER]),
    validateBodyDto(AddItemDto),
    adminController.addItem.bind(adminController)
);


// PUT /admin/updateItem/:id
adminRouter.put('/updateItem/:id',
    passport.authenticate("jwt", { session: false }),
    roleAccessMiddleware([RoleEnum.ADMIN, RoleEnum.MANAGER]),
    validateParamsId(),
    validateBodyDto(UpdateItemDto),
    adminController.patchUpdateItem.bind(adminController)
);


export default adminRouter;