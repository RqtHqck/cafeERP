import logger from "@utils/logger";
import ApiError from "@errors/ApiError";
import db from "@utils/sequelize.utility";
import {IItem, IItemUpdate} from "@entities/interfaces";
import {Sequelize} from "sequelize-typescript";
import {ValidationError} from "sequelize";

export class ItemRepository {

    constructor(private _db: any = db) { }


    async add(options: object) {
        logger.info(`ItemRepository::add dto ${options}`);

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
            if (err instanceof ValidationError) {
                throw ApiError.badRequestError('Validation error', err);
            }
            throw ApiError.databaseError("Error create items", err);
        }
    }


    async addMany(items: IItem[], options: object = {}) {
        logger.info(`ItemRepository::addMany dto ${JSON.stringify(items)}`);

        try{
            return await this._db.Item.bulkCreate(items, options);
        } catch(err) {
            if (err instanceof ValidationError) {
                throw ApiError.validationError('Validation failed', err.errors.map(e => (
                    e.message.toString()
                )), err);
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
            throw ApiError.databaseError(`Error update item`, err);
        }
    }


    async findAll(filters: object = {}) {
        logger.info(`ItemRepository::findAll ${JSON.stringify(filters)}`);

        try{
            return await this._db.Item.findAll(filters);
        } catch(err) {
            throw ApiError.databaseError("Error find all items", err);
        }
    }


    async findByPk(id: number) {
        logger.info(`ItemRepository::findByPk`);

        try{
            return await this._db.Item.findByPk(id);
        } catch(err) {
            throw ApiError.databaseError(`Error find item by id: ${id}`, err);
        }
    }
}
