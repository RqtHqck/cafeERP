import logger from "@utils/logger";
import {IExpense} from "@entities/interfaces";
import {ExpenseRepository} from "@repositories/expense.repository";
import {IItemCreatedEventPayload} from "@entities/dto/events";
import {Transaction} from "sequelize";

export class ExpenseService {

    private _expenseRepository: ExpenseRepository;

    constructor() {
        this._expenseRepository = new ExpenseRepository();
    }


    async recordItemPurchase(eventPayload: IItemCreatedEventPayload, options: {transaction: Transaction}) {
        logger.info("ExpenseService::recordItemPurchase")

        const record: IExpense = {
            itemId: eventPayload.itemId,
            totalPrice: eventPayload.price * eventPayload.quantity,
            paymentMethod: eventPayload.paymentMethod,
        }

        await this._expenseRepository.create(record, options)
    }
}
