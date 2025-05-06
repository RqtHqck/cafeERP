import logger from "@utils/logger";
import ApiError from "@errors/ApiError";
import db from "@utils/sequelize.utility";
import {IExpense} from "@entities/interfaces";


export class ExpenseRepository {

    constructor(private _db: any = db) {
    }

    async findOne(options: object = {}): Promise<IExpense> {
        logger.info(`ExpenseRepository::findOne options: ${JSON.stringify(options)}`)

        try{
            return await this._db.Expense.findOne(options);
        } catch(err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw ApiError.databaseError("Error find expense", err);
        }
    }


    async create(obj: IExpense, options: object = {}): Promise<void> {
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


    async createMany(objArr: IExpense[], options: object = {}) {
        try{
            logger.info(`ExpenseRepository::createMany dto ${objArr}`);
            // If exists ignore
            await this._db.Expense.bulkCreate(objArr, options);
        } catch(err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw ApiError.databaseError("Error create expense records", err);
        }
    }


    async findAll(filters: object = {}): Promise<IExpense[]> {
        logger.info(`ExpenseRepository::findAll ${JSON.stringify(filters)}`);

        try{
            return await this._db.Expense.findAll(filters);

        } catch(err) {
            throw ApiError.databaseError("Error find all expenses", err);
        }
    }


    async findByPk(id: number) {
        logger.info(`ExpenseRepository::findByPk`);

        try{
            return await this._db.Expense.findByPk(id);

        } catch(err) {
            throw ApiError.databaseError(`Error find expense by id: ${id}`, err);
        }
    }
}