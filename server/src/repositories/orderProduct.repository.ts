import logger from "@utils/logger";
import ApiError from "@errors/ApiError";
import db from "@utils/sequelize.utility";
import {IOrderProduct, IProductItem} from "@entities/interfaces";
import {ForeignKeyConstraintError} from "sequelize";


export class OrderProductRepository {

    constructor(private _db: any = db) { }


    async findAll(options: object = {}): Promise<IOrderProduct[]> {
        logger.info(`OrderProductsRepository::findAll options: ${JSON.stringify(options)}`)

        try{
            return await this._db.OrderProduct.findAll(options);
        } catch(err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw ApiError.databaseError("Error find order products", err);
        }
    }


    async createMany(createObj: IOrderProduct[], options: object = {}): Promise<void> {
        logger.info(`OrderProductsRepository::createMany dto ${JSON.stringify(createObj)}`);

        try{
            // If exists ignore
            await this._db.OrderProduct.bulkCreate(createObj, options);
        } catch(err) {
            if (err instanceof ApiError) {
                throw err;
            }
            if (err instanceof ForeignKeyConstraintError && err.name === 'SequelizeForeignKeyConstraintError') {
                throw ApiError.badRequestError("One or more itemIds do not exist in the database")
            }
            throw ApiError.databaseError("Error create order products", err);
        }
    }
}
