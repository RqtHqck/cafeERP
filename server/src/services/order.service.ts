import logger from "@utils/logger";
import {
    IAuthPayload,
    IItem,
    IOrder, IOrderProduct,
    IOrderStatusHistory,
    IPayment,
    IProduct,
    IProductItem
} from "@entities/interfaces";
import {Transaction} from "sequelize";
import {CreateOrderDto, UpdateOrderDto} from "@entities/dto/order.dto";
import {OrderRepository} from "@repositories/order.repository";
import {ProductService} from "@services/product.service";
import {OrderStatusService} from "@services/orderStatus.service";
import {OrderStatusEnum, RoleEnum} from "@entities/enums";
import ApiError from "@errors/ApiError";
import {OrderStatusesHistoryRepository} from "@repositories/orderStatusesHistory.repository";
import {PaymentRepository} from "@repositories/payment.repository";
import {RoleService} from "@services/role.service";
import {OrderProductRepository} from "@repositories/orderProduct.repository";
import Product from "@models/product.model";
import {ItemService} from "@services/item.service";
import {ProductItemRepository} from "@repositories/productItem.repository";
import Item from "@models/item.model";


export class OrderService {

    private _orderRepository: OrderRepository;
    private _paymentRepository: PaymentRepository;
    private _orderProductRepository: OrderProductRepository;
    private _productItemRepository: ProductItemRepository;

    private _orderStatusesHistoryRepository: OrderStatusesHistoryRepository;
    private _roleService: RoleService;
    private _itemService: ItemService;


    private _productService: ProductService;
    private _orderStatusService: OrderStatusService;


    constructor() {
        this._orderRepository = new OrderRepository();
        this._orderProductRepository = new OrderProductRepository();
        this._itemService = new ItemService();
        this._productItemRepository = new ProductItemRepository();

        this._orderStatusesHistoryRepository = new OrderStatusesHistoryRepository();
        this._paymentRepository = new PaymentRepository();
        this._roleService = new RoleService();

        this._productService = new ProductService();
        this._orderStatusService = new OrderStatusService();
    }


    async createOrder(createOrderDto: CreateOrderDto, employeeId: number, options: { transaction: Transaction }): Promise<IOrder> {
        logger.info("OrderService::createOrder")

        // Find available products by id
        const productIds: number[] = createOrderDto.products.map(product => product.productId)

        // Get products with availability
        let productItems = await this._productItemRepository.findAll({
            where: { productId: productIds },
            include: [
                { model: Item }, { model: Product }
            ],
            raw: false,
            nest: true

        })
        productItems = this._productService.setProductsAvailableForOrder(productItems);

        const products = this._productService.doUniqueProducts(productItems.map((productItem: IProductItem) => ({
            id: productItem.product!.id,
            name: productItem.product!.name,
            description: productItem.product!.description,
            price: productItem.product!.price,
            categoryId: productItem.product!.categoryId,
            available: productItem.product!.available,
        })));

        // check if all products found
        if (products.length !== productIds.length) {
            const missingIds = productIds.filter(id => !products.map(p => p.id).includes(id));
            throw ApiError.badRequestError(`Products not found: ${missingIds.join(', ')}`);
        }
        // check if all products are available
        if (!products.every(product => this._productService.isAvailableProduct(product))) {
            const unavailableProducts = products
                .filter(product => !this._productService.isAvailableProduct(product))
                .map(p => p.id);
            throw ApiError.badRequestError(`Products not available: ${unavailableProducts.join(', ')}`);
        }

        // Total products price
        const totalProductsPrice = this._productService.calculateProductsTotalPrice(products);
        // Find status for statusId field
        const orderStatus = await this._orderStatusService.findOneByName(OrderStatusEnum.PROCESSING);

        // Create order
        const order: IOrder = {
            customerName: createOrderDto.customerName!,
            price: totalProductsPrice!,
            employeeId: employeeId!,
            statusId: orderStatus.id!
        }
        const newOrder = await this._orderRepository.create(order, options);

        // Decrement each item quantity
        await this._itemService.deductFromItemsQuantity(createOrderDto.products, productItems);

        // Create records in OrderProducts table
        const orderProducts = createOrderDto.products.map((product) => ({
            orderId: newOrder.id!,
            productId: product.productId!,
            quantity: product.quantity!

        }))
        await this._orderProductRepository.createMany(orderProducts, options);

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


    async getOrderProducts(id: number): Promise<IOrderProduct[]>  {
        logger.info("OrderService::getOrderProducts")

        const order = await this._orderRepository.findByPk(id);
        if (!order) {
            throw ApiError.notFoundError("Order not found")
        }

        let orderProducts: any = await this._orderProductRepository.findAll({
            where: { orderId: id },
            attributes: ['quantity'],
            include: [
                {
                    model: Product,
                }
            ]
        })

        if (orderProducts.length === 0) {
            return []
        }

        orderProducts = orderProducts.map((orderProduct: IOrderProduct) => (
            {
                orderId: id,
                quantity: orderProduct.quantity,
                product: orderProduct.product!
            }
        ))

        return orderProducts;
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


    async changeOrderStatus(orderId: number, statusId: number, options: { transaction: Transaction }): Promise<void> {
        logger.info(`OrderService::changeOrderStatus orderId: ${orderId}, statusId: ${statusId}`)

        // Check if status exists. It will throw error, if not exists
        await this._orderStatusService.findOneByPk(statusId);

        const order = await this._orderRepository.findByPk(orderId);
        if (!order) {
            throw ApiError.notFoundError("Order not found");
        }

        // Create history of order status
        const orderStatusHistoryDto: IOrderStatusHistory = {
            orderId,
            statusId
        }
        await this._orderStatusesHistoryRepository.create(orderStatusHistoryDto, options)

        await this._orderRepository.update({statusId}, {
            where: { id: orderId },
            transaction: options.transaction
        })
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
