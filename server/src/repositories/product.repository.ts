import logger from "@utils/logger";
import ApiError from "@errors/ApiError";
import db from "@utils/sequelize.utility";


export class ProductRepository {

    constructor(private _db: any = db) { }


    async add(options: object) {
        logger.info(`ProductRepository::add`);

        try{
            const [product, created] = await this._db.Product.findOrCreate(options);

            if (!created) {
                throw ApiError.conflictError(`Product is exists`);
            }
            return product;

        } catch(err) {
            throw ApiError.databaseError("Error create products", err);
        }
    }


    async findAll(filters: object = {}) {
        logger.info(`ProductRepository::findAll ${JSON.stringify(filters)}`);

        try{
            return await this._db.Product.findAll(filters);

        } catch(err) {
            throw ApiError.databaseError("Error find all products", err);
        }
    }


    async findByPk(id: number) {
        logger.info(`ProductRepository::findByPk`);

        try{
            return await this._db.Product.findByPk(id);

        } catch(err) {
            throw ApiError.databaseError(`Error find product by id: ${id}`, err);
        }
    }
}
