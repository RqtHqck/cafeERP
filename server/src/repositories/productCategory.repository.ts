import logger from "@utils/logger";
import ApiError from "@errors/ApiError";
import db from "@utils/sequelize.utility";
import {IProductCategory, IRole} from "@entities/interfaces";


export class ProductCategoryRepository {

    constructor(private _db: any = db) { }


    async findByPk(id: number): Promise<IProductCategory | null> {
        logger.info(`CategoryRepository::findByPk id: ${JSON.stringify(id)}`)

        try{
            return await this._db.ProductCategory.findByPk(id);
        } catch(err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw ApiError.databaseError("Error find category by id", err);
        }
    }


    async findOne(filter: object = {}): Promise<IProductCategory | null> {
        logger.info(`CategoryRepository::findOne filter: ${JSON.stringify(filter)}`)

        try{
            return await this._db.ProductCategory.findOne(filter);
        } catch(err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw ApiError.databaseError("Error find category", err);
        }
    }


    async createMany(productCategories: IProductCategory[]) {
        logger.info(`CategoryRepository::createMany dto ${JSON.stringify(productCategories)}`);

        try{
            await this._db.ProductCategory.bulkCreate(productCategories, { ignoreDuplicates: true });
        } catch(err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw ApiError.databaseError("Error create categories", err);
        }
    }
}
