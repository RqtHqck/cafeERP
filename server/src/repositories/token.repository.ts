import db from "@utils/sequelize.utility";
import {IToken} from "@entities/interfaces";
import logger from "@utils/logger";
import ApiError from "@errors/ApiError";
import {Transaction} from "sequelize";

export class TokenRepository {

    constructor(private _db: any = db) { }


    async findOne(filter: object = {}): Promise<IToken | null> {
        logger.info(`TokenRepository::findOne filter: ${JSON.stringify(filter)}`)

        try{
            return await this._db.Token.findOne(filter);
        } catch(err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw ApiError.databaseError("Error find token", err);
        }
    }


    async create(obj: IToken, options?: {transaction: Transaction}): Promise<any> {
        logger.info(`TokenRepository::create`);

        try{
            return await this._db.Token.create(obj, options);
        } catch(err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw ApiError.databaseError("Error create token", err);
        }
    }


    async destroy(options: object): Promise<any> {
        logger.info(`TokenRepository::destroy`);

        try{
            return await this._db.Token.destroy(options);
        } catch(err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw ApiError.databaseError("Error destroy token", err);
        }
    }


    async update(updateObj: IToken, filter?: object, options?: {transaction: Transaction}): Promise<any> {
        logger.info(`TokenRepository::update dto: ${JSON.stringify(updateObj)}, filters: ${JSON.stringify(filter)}`);

        try{
            const [affectedCount] = await this._db.Token.update(
                updateObj, filter, options
            );

            logger.info(`Affected fields count: ${affectedCount}`);
            if (affectedCount === 0) {
                throw ApiError.notFoundError("Token not found and not updated");
            }

        } catch(err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw ApiError.databaseError("Error update token", err);
        }
    }
}
