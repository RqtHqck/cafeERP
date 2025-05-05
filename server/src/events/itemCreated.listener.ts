import eventEmitter from './eventEmitter';
import logger from "@utils/logger";
import {ExpenseService} from "@services/expense.service";
import {IItemCreatedEventPayload} from "@entities/dto/events";
import {Transaction} from "sequelize";

const expenseService = new ExpenseService();

eventEmitter.on('item:created', async (eventPayload: IItemCreatedEventPayload, options: {transaction: Transaction}) => {
    logger.info(`Item with id:${eventPayload.itemId} created. Make records in expenses table`);
    await expenseService.recordItemPurchase(eventPayload, options);
});
