import { Request, Response, NextFunction } from 'express';
import {plainToInstance} from "class-transformer";
import {AddItemDto, ItemDto} from "@entities/dto/item.dto";
import {ItemService} from "@services/item.service";
import {ProductDto} from "@entities/dto/product.dto";
import db from "@utils/sequelize.utility";
import {CreateOrderDto, OrderDto} from "@entities/dto/order.dto";
import {OrderService} from "@services/order.service";
import {IAuthPayload} from "@entities/interfaces";
import ApiError from "@errors/ApiError";

export class OrderController {

    private _orderService: OrderService;

    constructor(orderService: OrderService) {
        this._orderService = orderService;
    }


    async createOrder(req: Request, res: Response, next: NextFunction): Promise<any> {
        const transaction = await db.sequelize.transaction();

        try {
            const createOrderDto = <CreateOrderDto>req.body;
            const authPayload = <IAuthPayload>req.user;

            const order = await this._orderService.createOrder(createOrderDto, authPayload.employeeId, { transaction });

            await transaction.commit();

            const responseOrder = plainToInstance(OrderDto, order, {
                excludeExtraneousValues: true,
            });

            return res
                .status(201)
                .json(order)
        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    }


    async getAllOrders(req: Request, res: Response, next: NextFunction): Promise<any> {

        try {
            const filters = req.query;
            const orders = await this._orderService.getOrders();

            const responseOrders = plainToInstance(OrderDto, orders, {
                excludeExtraneousValues: true,
            });

            return res
                .status(200)
                .json(responseOrders)
        } catch (error) {
            next(error);
        }
    }


    async getEmployeeOrders(req: Request, res: Response, next: NextFunction): Promise<any> {

        try {
            const authPayload = <IAuthPayload>req.user;

            const orders = await this._orderService.getEmployeeOrders(authPayload.employeeId);

            const responseOrders = plainToInstance(OrderDto, orders, {
                excludeExtraneousValues: true,
            });

            return res
                .status(200)
                .json(responseOrders)
        } catch (error) {
            next(error);
        }
    }


    async getOrderByPk(req: Request, res: Response, next: NextFunction): Promise<any> {

        try {
            const id = parseInt(req.params.id as string, 10);
            const authPayload = <IAuthPayload>req.user;

            const order = await this._orderService.getOrderByPk(authPayload.employeeId, id);

            const responseOrder = plainToInstance(OrderDto, order, {
                excludeExtraneousValues: true,
            });

            return res
                .status(200)
                .json(responseOrder)
        } catch (error) {
            next(error);
        }
    }
}
