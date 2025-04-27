import db from "@utils/sequelize.utility";
import {IToken} from "@entities/interfaces";
import logger from "@utils/logger";
import ApiError from "@errors/ApiError";
import {Transaction} from "sequelize";

export class TokenRepository {

    constructor(private _db: any = db) { }


    async findOne(filter: object): Promise<IToken | null> {
        try{
            logger.info(`TokenRepository::findOne filter: ${JSON.stringify(filter)}`)
            const token = await this._db.Token.findOne({
                where: filter
            });
            return token;
        } catch(err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw ApiError.databaseError("Error find token", err);
        }
    }


    async create(obj: IToken, options?: {transaction: Transaction}): Promise<any> {
        try{
            logger.info(`TokenRepository::create dto: ${JSON.stringify(obj)}`);

            return await this._db.Token.create(obj, options);
        } catch(err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw ApiError.databaseError("Error create token", err);
        }
    }


    async destroy(filter: object, options?: {transaction: Transaction}): Promise<any> {
        try{
            logger.info(`TokenRepository::destroy filter: ${JSON.stringify(filter)}`);

            return await this._db.Token.destroy({ where: filter, ...options });
        } catch(err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw ApiError.databaseError("Error destroy token", err);
        }
    }


    async update(updateObj: IToken, filter?: object, options?: {transaction: Transaction}): Promise<any> {
        try{
            logger.info(`TokenRepository::update dto: ${JSON.stringify(updateObj)}, filters: ${JSON.stringify(filter)}`);
            const [affectedCount] = await this._db.Token.update(
                updateObj, {
                    where: filter,
                },
                options
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
