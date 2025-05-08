import {Router} from 'express';
import passport from "@middlewares/passport.middleware";
import {roleAccessMiddleware} from "@middlewares/availability/roleAccess.middleware";
import {RoleEnum} from "@entities/enums";
import {ExpenseController} from "@controllers/expense.controller";
import {ExpenseService} from "@services/expense.service";
import {validateParamsId} from "@middlewares/validation/validateId.middleware";


const expenseService = new ExpenseService();
const expenseController = new ExpenseController(expenseService);

const expensesRouter = Router();


// GET /expenses/
expensesRouter.get('/',
    passport.authenticate("jwt", { session: false }),
    roleAccessMiddleware([RoleEnum.ADMIN, RoleEnum.MANAGER]),
    expenseController.getAllExpenses.bind(expenseController)
);


// GET /expenses/:id/printCheck
expensesRouter.get('/:id/printCheck',
    passport.authenticate("jwt", { session: false }),
    roleAccessMiddleware([RoleEnum.ADMIN, RoleEnum.MANAGER]),
    validateParamsId(),
    expenseController.printCheck.bind(expenseController)
);

export default expensesRouter;