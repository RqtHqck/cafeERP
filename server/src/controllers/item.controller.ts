import { Request, Response, NextFunction } from 'express';
import {plainToInstance} from "class-transformer";
import {AddItemDto, ItemDto} from "@entities/dto/item.dto";
import {ItemService} from "@services/item.service";

export class ItemController {

    private _itemService: ItemService;

    constructor(itemService: ItemService) {
        this._itemService = itemService;
    }


    async addOneItem(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const addItemDto = <AddItemDto>req.body
            const item = await this._itemService.addItems(addItemDto);

            const responseItem = plainToInstance(ItemDto, item, {
                excludeExtraneousValues: true,
            });

            return res
                .status(201)
                .json(responseItem)
        } catch (error) {
            next(error);
        }
    }


    async addManyItems(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const addItemDto = <AddItemDto[]>req.body
            const items = await this._itemService.addManyItems(addItemDto);

            const responseItems = plainToInstance(ItemDto, items, {
                excludeExtraneousValues: true,
            });

            return res
                .status(201)
                .json(responseItems)
        } catch (error) {
            next(error);
        }
    }


    async patchUpdateItem(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const id = parseInt(req.params.id as string, 10);

            const addItemDto = <AddItemDto>req.body
            const item = await this._itemService.updateItem(id, addItemDto);

            const responseItem = plainToInstance(ItemDto, item, {
                excludeExtraneousValues: true,
            });

            return res
                .status(201)
                .json(responseItem)
        } catch (error) {
            next(error);
        }
    }
}
