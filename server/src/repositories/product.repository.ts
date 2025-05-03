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
            if (err instanceof ApiError) {
                throw err;
            }
            throw ApiError.databaseError("Error create products", err);
        }
    }


}
