import {EmployeeRepository} from "@repositories/employee.repository";

import {RoleRepository} from "@repositories/role.repository";
import {CreateEmployeeDto} from "@entities/dto/employee.dto";
import logger from "@utils/logger";
import ApiError from "@errors/ApiError";
import {generatePassword, generateSalt} from "@utils/password.utility";
import {IEmployee, IItem, IItemUpdate} from "@entities/interfaces";
import {AddItemDto, UpdateItemDto} from "@entities/dto/item.dto";
import {ItemRepository} from "@repositories/item.repository";

export class ItemService {

    private _itemRepository: ItemRepository;


    constructor() {
        this._itemRepository = new ItemRepository();
    }


    async addItems(addItemDto: AddItemDto) {
        logger.info("ItemService::addItem")

        const item: IItem = {
            name: addItemDto.name,
            unit: addItemDto.unit,
            quantity: addItemDto.quantity,
            cost: addItemDto.cost
        }

        return await this._itemRepository.add({
            where: { name: item.name  },
            defaults: item
        });
    }


    async addManyItems(addItemsDto: AddItemDto[]) {
        logger.info("ItemService::addManyItems")

        const items: IItem[] = addItemsDto.map((item) => ({
            name: item.name,
            unit: item.unit,
            quantity: item.quantity,
            cost: item.cost
        }))

        return await this._itemRepository.addMany(items);
    }


    async updateItem(id: number, updateItemDto: UpdateItemDto) {
        logger.info("ItemService::addItem")

        const item: IItemUpdate = {
            name: updateItemDto.name,
            unit: updateItemDto.unit,
            quantity: updateItemDto.quantity,
            cost: updateItemDto.cost
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
