import {Router} from 'express';
import passport from "@middlewares/passport.middleware";
import {roleAccessMiddleware} from "@middlewares/availability/roleAccess.middleware";
import {RoleEnum} from "@entities/enums";
import {PaymentController} from "@controllers/payment.controller";
import {PaymentService} from "@services/payment.service";
import {validateParamsId} from "@middlewares/validation/validateId.middleware";

const paymentService = new PaymentService();
const paymentController = new PaymentController(paymentService);

const paymentsRouter = Router();

// GET /payments/
paymentsRouter.get('/',
    passport.authenticate("jwt", { session: false }),
    roleAccessMiddleware([RoleEnum.ADMIN, RoleEnum.MANAGER, RoleEnum.CASHIER]),
    paymentController.getAllPayments.bind(paymentController)
);

// GET /payments/:id/printCheck
paymentsRouter.get('/:id/printCheck',
    passport.authenticate("jwt", { session: false }),
    roleAccessMiddleware([RoleEnum.ADMIN, RoleEnum.MANAGER, RoleEnum.CASHIER]),
    validateParamsId(),
    paymentController.printCheck.bind(paymentController)
);

export default paymentsRouter;
