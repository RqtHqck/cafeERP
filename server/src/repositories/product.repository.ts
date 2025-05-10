import logger from "@utils/logger";
import ApiError from "@errors/ApiError";
import db from "@utils/sequelize.utility";
import {IProduct} from "@entities/interfaces";
import {ValidationError} from "sequelize";


export class ProductRepository {

    constructor(private _db: any = db) { }


    async add(obj: object,options: object): Promise<IProduct> {
        logger.info(`ProductRepository::add`);

        try{
            return await this._db.Product.create(obj, options);

        } catch(err) {
            if (err instanceof ApiError) {
                throw err
            }
            if (err instanceof ValidationError) {
                throw ApiError.validationError(
                    'Product validation failed',
                    err.errors.map(e => (e.message.toString()),
                    err
                ));
            }
            throw ApiError.databaseError("Error create products", err);
        }
    }


    async findAll(filters: object = {}): Promise<IProduct[]> {
        logger.info(`ProductRepository::findAll ${JSON.stringify(filters)}`);

        try{
            return await this._db.Product.findAll(filters);

        } catch(err) {
            throw ApiError.databaseError("Error find all products", err);
        }
    }


    async findByPk(id: number): Promise<IProduct> {
        logger.info(`ProductRepository::findByPk id: ${id}`);

        try{
            return await this._db.Product.findByPk(id);

        } catch(err) {
            throw ApiError.databaseError(`Error find product by id: ${id}`, err);
        }
    }

    async findOne(options: object): Promise<IProduct> {
        logger.info(`ProductRepository::findOne options: ${options}`);

        try{
            return await this._db.Product.findOne(options);
        } catch(err) {
            throw ApiError.databaseError(`Error find product`, err);
        }
    }
}
