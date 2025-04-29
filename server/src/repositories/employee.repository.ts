import logger from "@utils/logger";
import ApiError from "@errors/ApiError";
import db from "@utils/sequelize.utility";
import {IEmployee} from "@entities/interfaces";

export class EmployeeRepository {

    constructor(private _db: any = db) { }


    async findOrCreate(options: object) {
        logger.info(`EmployeeRepository::create options: ${JSON.stringify(options)}`);

        try{
            const [employee, created] = await this._db.Employee.findOrCreate(options);

            if (!created) {
                throw ApiError.conflictError(`Employee is exists`);
            }
            return employee;
        } catch(err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw ApiError.databaseError("Error create employee", err);
        }
    }


    async findOne(filter: object = {}): Promise<IEmployee | null> {
        logger.info(`EmployeeRepository::findOne filter: ${JSON.stringify(filter)}`)

        try{
            return await this._db.Employee.findOne(filter);
        } catch(err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw ApiError.databaseError("Error find status", err);
        }
    }
}
