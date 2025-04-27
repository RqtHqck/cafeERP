import logger from "@utils/logger";
import ApiError from "@errors/ApiError";
import db from "@utils/sequelize.utility";
import {IRole} from "@entities/interfaces";


export class RoleRepository {

    constructor(private _db: any = db) { }


    async findOne(filter: object | {}): Promise<IRole | null> {
        try{
            logger.info(`RoleRepository::findOne filter: ${JSON.stringify(filter)}`)
            const role = await this._db.Role.findOne({
                where: filter
            });
            return role;
        } catch(err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw ApiError.databaseError("Error find role", err);
        }
    }



    async createMany(createRoles: IRole[]) {
        try{
            logger.info(`RoleRepository::createMany dto ${JSON.stringify(createRoles)}`);
            // If exists ignore
            await this._db.Role.bulkCreate(createRoles, { ignoreDuplicates: true });
        } catch(err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw ApiError.databaseError("Error create roles", err);
        }
    }
}
