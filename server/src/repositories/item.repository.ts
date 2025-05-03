import logger from "@utils/logger";
import ApiError from "@errors/ApiError";
import db from "@utils/sequelize.utility";
import {IItem, IItemUpdate, IRole} from "@entities/interfaces";


export class ItemRepository {

    constructor(private _db: any = db) { }


    async add(options: object) {
        logger.info(`ItemRepository::add dto ${JSON.stringify(options)}`);

        try{

            const [item, created] = await this._db.Item.findOrCreate(options);

            if (!created) {
                throw ApiError.conflictError(`Item is exists`);
            }
            return item;

        } catch(err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw ApiError.databaseError("Error create items", err);
        }
    }


    async addMany(items: IItem[], options: object = {}) {
        try{
            logger.info(`ItemRepository::createMany dto ${JSON.stringify(items)}`);
            // If exists ignore
            await this._db.Item.bulkCreate(items, options);
        } catch(err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw ApiError.databaseError("Error create items", err);
        }
    }


    async update(updateObj: IItemUpdate,  options: object = {}) {
        logger.info(`ItemRepository::update dto: ${JSON.stringify(updateObj)}`)

        try{
            const [affectedCount, updatedItem] = await this._db.Item.update(
                updateObj, options
            );

            logger.info(`Affected fields count: ${affectedCount}`);
            if (affectedCount === 0) {
                throw ApiError.notFoundError("Item not found and not updated");
            }
            return updatedItem[0]
        } catch(err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw ApiError.databaseError(`Error update item `, err);
        }
    }
}
