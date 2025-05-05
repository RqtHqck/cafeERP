import logger from "@utils/logger";
import {IExpense} from "@entities/interfaces";
import {ExpenseRepository} from "@repositories/expense.repository";
import {IItemCreatedDto} from "@entities/interfaces";
import {Transaction} from "sequelize";

export class ExpenseService {

    private _expenseRepository: ExpenseRepository;

    constructor() {
        this._expenseRepository = new ExpenseRepository();
    }


    async recordItemPurchase(itemDto: IItemCreatedDto, options: {transaction: Transaction}) {
        logger.info("ExpenseService::recordItemPurchase")

        const record: IExpense = {
            itemId: itemDto.itemId,
            totalPrice: itemDto.price * itemDto.quantity,
            paymentMethod: itemDto.paymentMethod,
        };

        await this._expenseRepository.create(record, options)
    }


    async recordItemsPurchases(itemDtos: IItemCreatedDto[], options: {transaction: Transaction}) {
        logger.info("ExpenseService::recordItemPurchase")

        const records: IExpense[] = itemDtos.map((item: IItemCreatedDto) => ({
            itemId: item.itemId,
            totalPrice: item.price * item.quantity,
            paymentMethod: item.paymentMethod,
        }))

        await this._expenseRepository.createMany(records, options)
    }
}
