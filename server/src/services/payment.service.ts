import logger from "@utils/logger";
import {IPayment, IPaymentCheck} from "@entities/interfaces";
import { PaymentRepository } from "@repositories/payment.repository";
import ApiError from "@errors/ApiError";
import {OrderService} from "@services/order.service";

export class PaymentService {

    private _paymentRepository: PaymentRepository;
    private _orderService: OrderService;

    constructor() {
        this._paymentRepository = new PaymentRepository();
        this._orderService = new OrderService();
    }


    async getPayments(filters: object = {}): Promise<IPayment[]> {
        logger.info(`PaymentService::getPayments`);

        return await this._paymentRepository.findAll(filters);
    }


    async printCheck(id: number): Promise<IPaymentCheck> {
        logger.info(`PaymentService::printCheck`);

        const payment = await this._paymentRepository.findByPk(id);
        if (!payment) {
            throw ApiError.notFoundError("Payment not found");
        }

        const orderProducts = await this._orderService.getProductsByOrderId(payment.orderId);
        if (!orderProducts) {
            throw ApiError.notFoundError("Payment not found");
        }

        const check: IPaymentCheck = {
            orderProducts: orderProducts,
            totalPrice: payment.totalPrice,
            paymentMethod: payment.paymentMethod,
            transactionDate: payment.transactionDate
        };

        return check;
    }
}
