import logger from "@utils/logger";
import {Op} from "sequelize";
import ApiError from "@errors/ApiError";
import db from "@utils/sequelize";
import {IEmployee} from "@entities/interfaces";

export class EmployeeRepository {

    constructor(private _db: any = db) { }


    async create(obj: IEmployee, filter: object | {}) {
        try{
            logger.info(`EmployeeRepository::create dto: ${JSON.stringify(obj)}, filter: ${JSON.stringify(filter)}`);

            const [employee, created] = await this._db.Employee.findOrCreate({
                where: filter,
                defaults: obj
            });

            if (!created) {
                throw ApiError.conflictError(`Employee ${JSON.stringify(obj)} exists`);
            }
            return employee;
        } catch(err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw ApiError.databaseError("Error create employee", err);
        }
    }
}
