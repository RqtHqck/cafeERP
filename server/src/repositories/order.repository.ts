import logger from "@utils/logger";
import ApiError from "@errors/ApiError";
import db from "@utils/sequelize.utility";
import {IItem, IOrder, IToken} from "@entities/interfaces";
import {Transaction} from "sequelize";


export class OrderRepository {

    constructor(private _db: any = db) { }

    async update(updateObj: Partial<IOrder>, options: object = {}): Promise<void> {
        logger.info(`OrderRepository::update dto: ${JSON.stringify(updateObj)}`);

        try{
            const [affectedCount] = await this._db.Order.update(
                updateObj, options
            );

            logger.info(`Affected fields count: ${affectedCount}`);
            if (affectedCount === 0) {
                throw ApiError.notFoundError("Order not found and not updated");
            }

        } catch(err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw ApiError.databaseError("Error update order", err);
        }
    }

    async create(obj: IOrder, options: object): Promise<IOrder> {
        logger.info(`OrderRepository::create options ${options}`);

        try{
            return await this._db.Order.create(obj, options);
        } catch(err) {
            throw ApiError.databaseError("Error create order", err);
        }
    }


    async findAll(filters: object = {}): Promise<IOrder[]>  {
        logger.info(`OrderRepository::findAll ${JSON.stringify(filters)}`);

        try{
            return await this._db.Order.findAll(filters);
        } catch(err) {
            throw ApiError.databaseError("Error find all orders", err);
        }
    }


    async findByPk(id: number): Promise<IOrder | null>  {
        logger.info(`OrderRepository::findByPk`);

        try{
            return await this._db.Order.findByPk(id);
        } catch(err) {
            throw ApiError.databaseError(`Error find order by id: ${id}`, err);
        }
    }
}
