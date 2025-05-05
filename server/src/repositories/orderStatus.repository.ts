import logger from "@utils/logger";
import ApiError from "@errors/ApiError";
import db from "@utils/sequelize.utility";
import {IOrderStatus, IRole} from "@entities/interfaces";


export class OrderStatusRepository {

    constructor(private _db: any = db) {
    }


    async findByPk(id: number): Promise<IOrderStatus | null> {
        logger.info(`OrderStatusRepository::findByPk id: ${JSON.stringify(id)}`)

        try {
            return await this._db.OrderStatus.findByPk(id);
        } catch (err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw ApiError.databaseError("Error find order status by id", err);
        }
    }


    async createMany(orderStatuses: IOrderStatus[]) {
        logger.info(`OrderStatusRepository::createMany dto ${JSON.stringify(orderStatuses)}`);

        try{
            await this._db.OrderStatus.bulkCreate(orderStatuses, { ignoreDuplicates: true });
        } catch(err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw ApiError.databaseError("Error create order statuses", err);
        }
    }
}

