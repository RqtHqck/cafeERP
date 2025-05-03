import logger from "@utils/logger";
import ApiError from "@errors/ApiError";
import db from "@utils/sequelize.utility";
import {ICategory, IRole} from "@entities/interfaces";


export class CategoryRepository {

    constructor(private _db: any = db) { }


    async findByPk(id: number): Promise<ICategory | null> {
        logger.info(`CategoryRepository::findByPk id: ${JSON.stringify(id)}`)

        try{
            return await this._db.Category.findByPk(id);
        } catch(err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw ApiError.databaseError("Error find category by id", err);
        }
    }


    async findOne(filter: object = {}): Promise<ICategory | null> {
        logger.info(`CategoryRepository::findOne filter: ${JSON.stringify(filter)}`)

        try{
            return await this._db.Category.findOne(filter);
        } catch(err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw ApiError.databaseError("Error find category", err);
        }
    }


    async createMany(createCategories: IRole[]) {
        logger.info(`CategoryRepository::createMany dto ${JSON.stringify(createCategories)}`);

        try{
            await this._db.Category.bulkCreate(createCategories, { ignoreDuplicates: true });
        } catch(err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw ApiError.databaseError("Error create categories", err);
        }
    }
}
