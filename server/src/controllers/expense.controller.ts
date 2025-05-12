import { Request, Response, NextFunction } from 'express';
import logger from "@utils/logger";
import {ExpenseService} from "@services/expense.service";
import {plainToInstance} from "class-transformer";
import {ExpenseCheckDto, ExpenseDto} from "@entities/dto/expense.dto";


export class ExpenseController {

    private _expenseService: ExpenseService;

    constructor(expenseService: ExpenseService) {
        this._expenseService = expenseService;
    }

    async getAllExpenses(req: Request, res: Response, next: NextFunction): Promise<void>  {
        logger.info("ExpenseController::getAllExpenses");

        try {
            const filters = req.query;
            const expenses = await this._expenseService.getExpenses();

            const responseExpenses = plainToInstance(ExpenseDto, expenses, {
                excludeExtraneousValues: true,
            });

            res
                .status(200)
                .json(responseExpenses)
        } catch (error) {
            next(error);
        }
    }


    async printCheck(req: Request, res: Response, next: NextFunction): Promise<void> {
        logger.info("ExpenseController::printCheck");

        try {
            const id = parseInt(req.params.id as string, 10);

            const check = await this._expenseService.printCheck(id);

            const responseCheck = plainToInstance(ExpenseCheckDto, check, {
                excludeExtraneousValues: true,
            });

            res
                .status(200)
                .json(responseCheck);
        } catch (error) {
            next(error);
        }
    }
}
