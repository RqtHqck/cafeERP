import { Request, Response, NextFunction } from 'express';
import {plainToInstance} from "class-transformer";
import {AddItemDto, ItemDto} from "@entities/dto/item.dto";
import {ItemService} from "@services/item.service";
import {ProductDto} from "@entities/dto/product.dto";
import db from "@utils/sequelize.utility";

export class ItemController {

    private _itemService: ItemService;

    constructor(itemService: ItemService) {
        this._itemService = itemService;
    }


    async addOneItem(req: Request, res: Response, next: NextFunction): Promise<void>  {
        const transaction = await db.sequelize.transaction();

        try {
            const addItemDto = <AddItemDto>req.body
            const item = await this._itemService.addItems(addItemDto, { transaction });


            const responseItem = plainToInstance(ItemDto, item, {
                excludeExtraneousValues: true,
            });

            await transaction.commit();

            res
                .status(201)
                .json(responseItem)
        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    }


    async addManyItems(req: Request, res: Response, next: NextFunction): Promise<void>   {
        const transaction = await db.sequelize.transaction();

        try {
            const addItemDto = <AddItemDto[]>req.body
            const items = await this._itemService.addManyItems(addItemDto, {transaction});


            const responseItems = plainToInstance(ItemDto, items, {
                excludeExtraneousValues: true,
            });

            await transaction.commit();

            res
                .status(201)
                .json(responseItems)
        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    }


    async patchUpdateItem(req: Request, res: Response, next: NextFunction): Promise<void>   {
        try {
            const id = parseInt(req.params.id as string, 10);

            const addItemDto = <AddItemDto>req.body
            const item = await this._itemService.updateItem(id, addItemDto);

            const responseItem = plainToInstance(ItemDto, item, {
                excludeExtraneousValues: true,
            });

            res
                .status(200)
                .json(responseItem)
        } catch (error) {
            next(error);
        }
    }


    async getAllItems(req: Request, res: Response, next: NextFunction): Promise<void>  {

        try {
            const filters = req.query;
            const items = await this._itemService.getItems();

            const responseItems = plainToInstance(ItemDto, items, {
                excludeExtraneousValues: true,
            });

            res
                .status(200)
                .json(responseItems)
        } catch (error) {
            next(error);
        }
    }


    async getItemByPk(req: Request, res: Response, next: NextFunction): Promise<void>  {

        try {
            const id = parseInt(req.params.id as string, 10);

            const item = await this._itemService.getByPk(id);

            const responseItem = plainToInstance(ItemDto, item, {
                excludeExtraneousValues: true,
            });

            res
                .status(200)
                .json(responseItem)
        } catch (error) {
            next(error);
        }
    }
}
