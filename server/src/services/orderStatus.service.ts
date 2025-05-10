import logger from "@utils/logger";
import {OrderStatusEnum, ProductCategoryEnum} from "@entities/enums";
import {ProductCategoryRepository} from "@repositories/productCategory.repository";
import {IOrderStatus, IProductCategory} from "@entities/interfaces";
import {OrderStatusRepository} from "@repositories/orderStatus.repository";

export class OrderStatusService {

    private _orderStatusRepository: OrderStatusRepository;

    constructor() {
        this._orderStatusRepository = new OrderStatusRepository();
    }


    async createMany(): Promise<void> {
        logger.info("OrderStatusService::createMany")
        const allowedOrderStatuses = [...Object.values(OrderStatusEnum)]
        // Create roles by enum
        let orderStatuses: IOrderStatus[] = allowedOrderStatuses.map((name: OrderStatusEnum): IOrderStatus => ({ name }));
        await this._orderStatusRepository.createMany(orderStatuses);
    }


    async findOneByName(name: OrderStatusEnum): Promise<IOrderStatus> {
        logger.info(`OrderStatusService::findOneByName`)

        return await this._orderStatusRepository.findByName(name);
    }
}