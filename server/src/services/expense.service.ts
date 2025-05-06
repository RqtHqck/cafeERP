import logger from "@utils/logger";
import {IExpense, IExpenseCheck} from "@entities/interfaces";
import {ExpenseRepository} from "@repositories/expense.repository";
import {IItemCreatedDto} from "@entities/interfaces";
import {Transaction} from "sequelize";
import Item from "@models/item.model";
import ApiError from "@errors/ApiError";
import {ItemUnitEnum, PaymentMethodEnum} from "@entities/enums";

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


    async getExpenses(filters: object = {}) {
        logger.info(`ExpenseService::getExpenses`)

        return await this._expenseRepository.findAll(filters);
    }


    async printCheck(id: number) {
        logger.info(`ExpenseService::printCheck`)

        const expenseWithItem: IExpense = await this._expenseRepository.findOne({
            where: { id },
            include: [{ model: Item }]
        });

        const item = expenseWithItem.item!

        const check: IExpenseCheck = {
            itemName: item.name,
            itemUnit: item.unit as ItemUnitEnum,
            itemUnitPrice: item.price,
            itemQuantity: item.quantity,
            totalPrice: expenseWithItem.totalPrice,
            paymentMethod: expenseWithItem.paymentMethod,
            transactionDate: expenseWithItem.transactionDate
        }

        if (!expenseWithItem) {
            throw ApiError.notFoundError("Expense check not found");
        }

        return check;
    }

}
