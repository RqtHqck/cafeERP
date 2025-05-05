import {EmployeeRepository} from "@repositories/employee.repository";

import {RoleRepository} from "@repositories/role.repository";
import {CreateEmployeeDto} from "@entities/dto/employee.dto";
import logger from "@utils/logger";
import ApiError from "@errors/ApiError";
import {generatePassword, generateSalt} from "@utils/password.utility";
import {IEmployee, IItem, IItemUpdate} from "@entities/interfaces";
import {AddItemDto, UpdateItemDto} from "@entities/dto/item.dto";
import {ItemRepository} from "@repositories/item.repository";
import eventEmitter from "../events/eventEmitter";
import {Transaction} from "sequelize";

export class ItemService {

    private _itemRepository: ItemRepository;


    constructor() {
        this._itemRepository = new ItemRepository();
    }


    async addItems(addItemDto: AddItemDto, options?: { transaction: Transaction }) {
        logger.info("ItemService::addItem")

        const item: IItem = {
            name: addItemDto.name,
            unit: addItemDto.unit,
            price: addItemDto.price,
            quantity: addItemDto.quantity
        }

         const newItem = await this._itemRepository.add({
            where: { name: item.name  },
            transaction: options?.transaction,
            defaults: item
        });

        eventEmitter.emit('item:created', {
            itemId: newItem.id,
            price: newItem.price,
            quantity: newItem.quantity,
            paymentMethod: newItem.paymentMethod,
            options
        })

        return newItem;
    }


    async addManyItems(addItemsDto: AddItemDto[]) {
        logger.info("ItemService::addManyItems")

        const items: IItem[] = addItemsDto.map((item) => ({
            name: item.name,
            unit: item.unit,
            price: item.price,
            quantity: item.quantity
        }))

        return await this._itemRepository.addMany(items);
    }


    async updateItem(id: number, updateItemDto: UpdateItemDto) {
        logger.info("ItemService::addItem")

        const item: IItemUpdate = {
            name: updateItemDto.name,
            unit: updateItemDto.unit,
        }

        return await this._itemRepository.update(
            item,
            {
                where: { id },
                returning: true, },
        );
    }

    async getItems(filters: object = {}) {
        logger.info(`ItemService::getItems`)

        return await this._itemRepository.findAll(filters);
    }


    async getByPk(id: number) {
        logger.info(`ItemService::getById`)

        return await this._itemRepository.findByPk(id);
    }
}
