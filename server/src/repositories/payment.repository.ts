import logger from "@utils/logger";
import ApiError from "@errors/ApiError";
import db from "@utils/sequelize.utility";
import {IPayment} from "@entities/interfaces";


export class PaymentRepository {

    constructor(private _db: any = db) {
    }

    async findOne(options: object = {}): Promise<IPayment | null> {
        logger.info(`PaymentsRepository::findOne options: ${JSON.stringify(options)}`)

        try{
            return await this._db.Payment.findOne(options);
        } catch(err) {
            throw ApiError.databaseError("Error find payment", err);
        }
    }


    async create(obj: IPayment, options: object = {}): Promise<void> {
        logger.info(`PaymentsRepository::create dto: ${JSON.stringify(obj)}`);

        try {
            await this._db.Payment.create(obj, options);
        } catch (err) {
            throw ApiError.databaseError("Error create payment record", err);
        }
    }


    async findAll(filters: object = {}): Promise<IPayment[]> {
        logger.info(`PaymentsRepository::findAll ${JSON.stringify(filters)}`);

        try{
            return await this._db.Payment.findAll(filters);
        } catch(err) {
            throw ApiError.databaseError("Error find all payments", err);
        }
    }


    async findByPk(id: number) {
        logger.info(`PaymentsRepository::findByPk`);

        try{
            return await this._db.Payment.findByPk(id);
        } catch(err) {
            throw ApiError.databaseError(`Error find payment by id: ${id}`, err);
        }
    }
}