import logger from "@utils/logger";
import ApiError from "@errors/ApiError";
import db from "@utils/sequelize.utility";
import {IExpense} from "@entities/interfaces";
import {Transaction} from "sequelize";


export class ExpenseRepository {

    constructor(private _db: any = db) {
    }


    async create(obj: IExpense, options: {transaction: Transaction}): Promise<void> {
        logger.info(`ExpenseRepository::create dto: ${JSON.stringify(obj)}`);

        try {
            await this._db.Expense.create(obj, options);
        } catch (err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw ApiError.databaseError("Error create expense record", err);
        }
    }
}