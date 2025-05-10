import logger from "@utils/logger";
import ApiError from "@errors/ApiError";
import db from "@utils/sequelize.utility";
import {IProductCategory, IProductItem, IRole} from "@entities/interfaces";


export class RoleRepository {

    constructor(private _db: any = db) { }


    async findByPk(id: number): Promise<IRole> {
        logger.info(`RoleRepository::findByPk id: ${JSON.stringify(id)}`)

        try{
            const role = await this._db.Role.findByPk(id);
            if (!role) {
                throw ApiError.notFoundError("Role not found")
            }
            return role
        } catch(err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw ApiError.databaseError("Error find role by id", err);
        }
    }


    async findOne(filter: object = {}): Promise<IRole | null> {
        logger.info(`RoleRepository::findOne filter: ${JSON.stringify(filter)}`)

        try{
            return await this._db.Role.findOne(filter);
        } catch(err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw ApiError.databaseError("Error find role", err);
        }
    }


    async createMany(createRoles: IRole[]): Promise<void> {
        logger.info(`RoleRepository::createMany dto ${JSON.stringify(createRoles)}`);

        try{
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
