import {Router} from 'express';
import passport from "@middlewares/passport.middleware";
import {validateBodyDto} from "@middlewares/validation/validateDto.middleware";
import {roleAccessMiddleware} from "@middlewares/availability/roleAccess.middleware";
import {RoleEnum} from "@entities/enums";
import {validateParamsId} from "@middlewares/validation/validateId.middleware";
import {CreateOrderDto} from "@entities/dto/order.dto";
import {OrderController} from "@controllers/order.controller";
import {OrderService} from "@services/order.service";


const orderService = new OrderService();
const orderController = new OrderController(orderService);

const orderRoutes = Router();

// POST /orders/
orderRoutes.post('/',
    passport.authenticate("jwt", { session: false }),
    roleAccessMiddleware([RoleEnum.ADMIN, RoleEnum.MANAGER]),
    validateBodyDto(CreateOrderDto),
    orderController.createOrder.bind(orderController)
);

// GET /orders/:id
orderRoutes.get('/:id',
    passport.authenticate("jwt", { session: false }),
    roleAccessMiddleware([RoleEnum.ADMIN, RoleEnum.MANAGER, RoleEnum.CASHIER, RoleEnum.COOK]),
    validateParamsId(),
    orderController.getOrderByPk.bind(orderController)
);

// GET /orders/all
orderRoutes.get('/all',
    passport.authenticate("jwt", { session: false }),
    roleAccessMiddleware([RoleEnum.ADMIN]),
    orderController.getAllOrders.bind(orderController)
);

// GET /orders/employee
orderRoutes.get('/employee',
    passport.authenticate("jwt", { session: false }),
    roleAccessMiddleware([RoleEnum.ADMIN, RoleEnum.MANAGER, RoleEnum.CASHIER, RoleEnum.COOK]),
    orderController.getEmployeeOrders.bind(orderController)
);

// PUT /orders/:id/status
orderRoutes.put('/:id/status',
    passport.authenticate("jwt", { session: false }),
    roleAccessMiddleware([RoleEnum.ADMIN]),
    validateParamsId(),
    validateBodyDto(CreateOrderDto),
    orderController.getAllOrders.bind(orderController)
);


export default orderRoutes;

