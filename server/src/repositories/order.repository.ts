import logger from "@utils/logger";
import ApiError from "@errors/ApiError";
import db from "@utils/sequelize.utility";
import {IItem, IOrder} from "@entities/interfaces";


export class OrderRepository {

    constructor(private _db: any = db) { }


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
