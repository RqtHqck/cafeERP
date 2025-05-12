import { Request, Response, NextFunction } from 'express';
import logger from "@utils/logger";
import { plainToInstance } from "class-transformer";
import { PaymentCheckDto, PaymentDto } from "@entities/dto/payment.dto";
import { PaymentService } from "@services/payment.service";

export class PaymentController {

    private _paymentService: PaymentService;

    constructor(paymentService: PaymentService) {
        this._paymentService = paymentService;
    }

    async getAllPayments(req: Request, res: Response, next: NextFunction): Promise<void> {
        logger.info("PaymentController::getAllPayments");

        try {
            const filters = req.query; // можно использовать в будущем
            const payments = await this._paymentService.getPayments();

            const responsePayments = plainToInstance(PaymentDto, payments, {
                excludeExtraneousValues: true,
            });

            res.status(200).json(responsePayments);
        } catch (error) {
            next(error);
        }
    }

    async printCheck(req: Request, res: Response, next: NextFunction): Promise<void> {
        logger.info("PaymentController::printCheck");

        try {
            const id = parseInt(req.params.id as string, 10);

            const check = await this._paymentService.printCheck(id);

            const responseCheck = plainToInstance(PaymentCheckDto, check, {
                excludeExtraneousValues: true,
            });

            res.status(200).json(responseCheck);
        } catch (error) {
            next(error);
        }
    }
}
