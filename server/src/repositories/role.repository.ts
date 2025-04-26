import loggerUtility from "@utils/logger.utility";
import ApiError from "@errors/ApiError";
import db from "@utils/sequelize.utility";
import {RoleEnum} from "@entities/enums";
import {IRole} from "@entities/interfaces";


export class RoleRepository {

    constructor(private _db: any = db) { }


    async findOne(filter: object | {}): Promise<IRole | null> {
        try{
            loggerUtility.info(`RoleRepository::findOne filter: ${JSON.stringify(filter)}`)
            const role = await this._db.Role.findOne({
                where: filter
            });
            return role ? role : null
        } catch(err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw ApiError.databaseError("Error find status", err);
        }
    }
}
