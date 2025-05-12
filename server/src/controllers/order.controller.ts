import { Request, Response, NextFunction } from 'express';
import {plainToInstance} from "class-transformer";
import db from "@utils/sequelize.utility";
import {CreateOrderDto, OrderDto, OrderProductDto, UpdateOrderDto} from "@entities/dto/order.dto";
import {OrderService} from "@services/order.service";
import {IAuthPayload} from "@entities/interfaces";


export class OrderController {

    private _orderService: OrderService;

    constructor(orderService: OrderService) {
        this._orderService = orderService;
    }


    async createOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
        const transaction = await db.sequelize.transaction();

        try {
            const createOrderDto = <CreateOrderDto>req.body;
            const authPayload = <IAuthPayload>req.user;

            const order = await this._orderService.createOrder(createOrderDto, authPayload.employeeId, { transaction });

            const responseOrder = plainToInstance(OrderDto, order, {
                excludeExtraneousValues: true,
            });

            await transaction.commit();

            res
                .status(201)
                .json(order)
        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    }


    async getAllOrders(req: Request, res: Response, next: NextFunction): Promise<void>{

        try {
            const filters = req.query;
            const orders = await this._orderService.getOrders();

            const responseOrders = plainToInstance(OrderDto, orders, {
                excludeExtraneousValues: true,
            });

            res
                .status(200)
                .json(responseOrders)
        } catch (error) {
            next(error);
        }
    }


    async getEmployeeOrders(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            const authPayload = <IAuthPayload>req.user;

            const orders = await this._orderService.getEmployeeOrders(authPayload.employeeId);

            const responseOrders = plainToInstance(OrderDto, orders, {
                excludeExtraneousValues: true,
            });

            res
                .status(200)
                .json(responseOrders)
        } catch (error) {
            next(error);
        }
    }


    async getOrderByPk(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            const id = parseInt(req.params.id as string, 10);
            const authPayload = <IAuthPayload>req.user;

            const order = await this._orderService.getOrderByPk(authPayload, id);

            const responseOrder = plainToInstance(OrderDto, order, {
                excludeExtraneousValues: true,
            });

            res
                .status(200)
                .json(responseOrder)
        } catch (error) {
            next(error);
        }
    }


    async changeOrderStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
        const transaction = await db.sequelize.transaction();

        try {
            const orderId = parseInt(req.params.id as string, 10);
            const statusId = parseInt(req.body.statusId as string, 10);

            await this._orderService.changeOrderStatus(orderId, statusId, {transaction});

            await transaction.commit();

            res
                .status(204)
                .end()
        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    }



    async getOrderProducts(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            const id = parseInt(req.params.id as string, 10);

            const orderProducts = await this._orderService.getOrderProducts(id);

            const responseOrderProducts = plainToInstance(OrderProductDto, orderProducts, {
                excludeExtraneousValues: true,
            });

            res
                .status(200)
                .json(responseOrderProducts)
        } catch (error) {
            next(error);
        }
    }
}
