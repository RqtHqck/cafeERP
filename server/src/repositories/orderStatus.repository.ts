import logger from "@utils/logger";
import ApiError from "@errors/ApiError";
import db from "@utils/sequelize.utility";
import {IOrderStatus, IRole} from "@entities/interfaces";
import {OrderStatusEnum} from "@entities/enums";


export class OrderStatusRepository {

    constructor(private _db: any = db) {
    }


    async findByName(name: OrderStatusEnum): Promise<IOrderStatus> {
        logger.info(`OrderStatusRepository::findByName name: ${name}`)

        try {
            return await this._db.OrderStatus.findOne({ where: { name } });
        } catch (err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw ApiError.databaseError("Error find order status by id", err);
        }
    }


    async createMany(orderStatuses: IOrderStatus[]): Promise<void> {
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


    async findByPk(id: number): Promise<IOrderStatus> {
        logger.info(`OrderStatusRepository::findByPk id: ${id}`)

        try{
            const orderStatus = await this._db.OrderStatus.findByPk(id);

            if (!orderStatus) {
                throw ApiError.notFoundError("Order status not found")
            }

            return orderStatus
        } catch(err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw ApiError.databaseError("Error find role by id", err);
        }
    }
}

