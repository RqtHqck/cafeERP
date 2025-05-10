import logger from "@utils/logger";
import {IAuthPayload, IOrder, IOrderStatusHistory, IPayment, IProduct, IRole} from "@entities/interfaces";
import {Transaction} from "sequelize";
import {CreateOrderDto} from "@entities/dto/order.dto";
import {OrderRepository} from "@repositories/order.repository";
import {ProductService} from "@services/product.service";
import {OrderStatusService} from "@services/orderStatus.service";
import {OrderStatusEnum, RoleEnum} from "@entities/enums";
import ApiError from "@errors/ApiError";
import {OrderStatusesHistoryRepository} from "@repositories/orderStatusesHistory.repository";
import {PaymentRepository} from "@repositories/payment.repository";
import {RoleService} from "@services/role.service";


export class OrderService {

    private _orderRepository: OrderRepository;
    private _paymentRepository: PaymentRepository;
    private _orderStatusesHistoryRepository: OrderStatusesHistoryRepository;
    private _roleService: RoleService;

    private _productService: ProductService;
    private _orderStatusService: OrderStatusService;


    constructor() {
        this._orderRepository = new OrderRepository();
        this._orderStatusesHistoryRepository = new OrderStatusesHistoryRepository();
        this._paymentRepository = new PaymentRepository();
        this._roleService = new RoleService();

        this._productService = new ProductService();
        this._orderStatusService = new OrderStatusService();
    }


    async createOrder(createOrderDto: CreateOrderDto, employeeId: number, options: { transaction: Transaction }): Promise<IOrder> {
        logger.info("OrderService::createOrder")

        // Find products and calculate total price
        const productIds: number[] = createOrderDto.products.map(product => product.productId)
        const dbProducts: IProduct[] = await this._productService.getProducts({
            where: { id: productIds }
        })

        if (!dbProducts) {
            throw ApiError.badRequestError("Products not found");
        }

        const totalProductsPrice = this._productService.calculateProductsTotalPrice(dbProducts);

        // Find status for statusId field
        const orderStatus = await this._orderStatusService.findOneByName(OrderStatusEnum.PROCESSING);

        // Create order
        const order: IOrder = {
            customerName: createOrderDto.customerName,
            price: totalProductsPrice,
            employeeId: employeeId,
            statusId: orderStatus.id!
        }
        const newOrder = await this._orderRepository.create(order, options);

        // Create history of order status
        const orderStatusHistoryDto: IOrderStatusHistory = {
            orderId: newOrder.id!,
            statusId: orderStatus.id!
        }
        await this._orderStatusesHistoryRepository.create(orderStatusHistoryDto, options)

        // Create payment record
        const paymentDto: IPayment = {
            orderId: newOrder.id!,
            totalPrice: totalProductsPrice,
            paymentMethod: createOrderDto.paymentMethod,
        }
        await this._paymentRepository.create(paymentDto, options)

        return order;
    }


    async getOrders(filters: object = {}): Promise<IOrder[]> {
        logger.info(`OrderService::getOrders`)

        return await this._orderRepository.findAll(filters);
    }


    async getEmployeeOrders(employeeId: number): Promise<IOrder[]> {
        logger.info(`OrderService::getEmployeeOrders employeeId: ${employeeId}`)
        const options = {
            where: { employeeId }
        }
        return await this._orderRepository.findAll(options);
    }


    async changeOrderStatus(status: OrderStatusEnum, options: { transaction: Transaction }) {

    }


    async getOrderByPk(authPayload: IAuthPayload, id: number): Promise<IOrder> {
        logger.info(`OrderService::getById`)
        const order = await this._orderRepository.findByPk(id);

        if (!order) {
            throw ApiError.notFoundError("Order not found")
        }

        const role = await this._roleService.findRoleByPk(authPayload.roleId);

        // If not admin and orderId is not employee order
        if (role.name !== RoleEnum.ADMIN && order.employeeId !== authPayload.employeeId) {
            throw ApiError.forbiddenError("Access denied");
        }

        return order;
    }
}
