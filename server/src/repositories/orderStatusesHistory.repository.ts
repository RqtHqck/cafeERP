import logger from "@utils/logger";
import ApiError from "@errors/ApiError";
import db from "@utils/sequelize.utility";
import {IOrder, IOrderStatusHistory} from "@entities/interfaces";


export class OrderStatusesHistoryRepository {

    constructor(private _db: any = db) { }


    async create(obj: IOrderStatusHistory, options: object): Promise<IOrder> {
        logger.info(`OrderStatusesHistoryRepository::create options ${options}`);

        try{
            return await this._db.OrderStatusesHistory.create(obj, options);
        } catch(err) {
            throw ApiError.databaseError("Error create order", err);
        }
    }


    async findAll(filters: object = {}) {
        logger.info(`OrderStatusesHistoryRepository::findAll ${JSON.stringify(filters)}`);

        try{
            return await this._db.OrderStatusesHistory.findAll(filters);
        } catch(err) {
            throw ApiError.databaseError("Error find all orders", err);
        }
    }
}
