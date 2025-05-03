import logger from "@utils/logger";
import ApiError from "@errors/ApiError";
import db from "@utils/sequelize.utility";
import {IProductItem, IRole} from "@entities/interfaces";
import {ForeignKeyConstraintError} from "sequelize";


export class ProductItemRepository {

    constructor(private _db: any = db) { }


    async findOne(filter: object = {}): Promise<IRole | null> {
        logger.info(`ProductItemRepository::findOne filter: ${JSON.stringify(filter)}`)

        try{
            return await this._db.ProductItems.findOne(filter);
        } catch(err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw ApiError.databaseError("Error find role", err);
        }
    }


    async createMany(createObj: IProductItem[], options: object = {}) {
        logger.info(`ProductItemRepository::createMany dto ${JSON.stringify(createObj)}`);

        try{
            // If exists ignore
            await this._db.ProductItems.bulkCreate(createObj, options);
        } catch(err) {
            if (err instanceof ApiError) {
                throw err;
            }
            if (err instanceof ForeignKeyConstraintError && err.name === 'SequelizeForeignKeyConstraintError') {
                throw ApiError.badRequestError("One or more itemIds do not exist in the database")
            }
            throw ApiError.databaseError("Error create productItems", err);
        }
    }
}
