import logger from "@utils/logger";
import {IExpense, IExpenseCheck} from "@entities/interfaces";
import {ExpenseRepository} from "@repositories/expense.repository";
import Item from "@models/item.model";
import ApiError from "@errors/ApiError";
import {ItemUnitEnum} from "@entities/enums";

export class ExpenseService {

    private _expenseRepository: ExpenseRepository;

    constructor() {
        this._expenseRepository = new ExpenseRepository();
    }


    async getExpenses(filters: object = {}): Promise<IExpense[]> {
        logger.info(`ExpenseService::getExpenses`)

        return await this._expenseRepository.findAll(filters);
    }


    async printCheck(id: number): Promise<IExpenseCheck> {
        logger.info(`ExpenseService::printCheck`)

        const expenseWithItem = await this._expenseRepository.findOne({
            where: { id },
            include: [{ model: Item }]
        });

        if (!expenseWithItem) {
            throw ApiError.notFoundError(`Expense not found`)
        }

        const item = expenseWithItem.item!

        const check: IExpenseCheck = {
            itemName: item.name,
            itemUnit: item.unit as ItemUnitEnum,
            itemUnitPrice: item.unitPrice,
            itemQuantity: item.quantity,
            totalPrice: expenseWithItem.totalPrice,
            paymentMethod: expenseWithItem.paymentMethod,
            transactionDate: expenseWithItem.transactionDate
        }

        return check;
    }

}
