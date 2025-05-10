import logger from "@utils/logger";
import {IItem, IItemCreatedDto, IItemUpdate} from "@entities/interfaces";
import {AddItemDto, UpdateItemDto} from "@entities/dto/item.dto";
import {ItemRepository} from "@repositories/item.repository";
import {Transaction} from "sequelize";
import {ExpenseService} from "@services/expense.service";
import {ItemUnitEnum, PaymentMethodEnum} from "@entities/enums";

export class ItemService {

    private _itemRepository: ItemRepository;
    private _expenseService: ExpenseService;


    constructor() {
        this._itemRepository = new ItemRepository();
        this._expenseService = new ExpenseService();
    }


    async addItems(addItemDto: AddItemDto, options: { transaction: Transaction }) {
        logger.info("ItemService::addItem")

        const item: IItem = {
            name: addItemDto.name,
            unit: addItemDto.unit,
            unitPrice: addItemDto.unitPrice,
            quantity: addItemDto.quantity
        }

         const newItem: IItem = await this._itemRepository.add({
            where: { name: item.name  },
            transaction: options.transaction,
            defaults: item
        });

        const expenseRecord: IItemCreatedDto = {
            itemId: newItem.id!,
            unitPrice: newItem.unitPrice,
            quantity: newItem.quantity,
            paymentMethod: addItemDto.paymentMethod,
        }

        await this._expenseService.recordItemPurchase(
            expenseRecord,
            options
        )
        return newItem;
    }


    async addManyItems(addItemsDtos: AddItemDto[], options: { transaction: Transaction }) {
        logger.info("ItemService::addManyItems")

        const items: IItem[] = addItemsDtos.map((item) => ({
            name: item.name,
            unit: item.unit as ItemUnitEnum,
            unitPrice: item.unitPrice,
            quantity: item.quantity
        }))

        const newItems = await this._itemRepository.addMany(items, {validate: true});

        // add more then one only with card
        const expenseRecords: IItemCreatedDto[] = newItems.map((item: IItem) => ({
            itemId: item.id!,
            unitPrice: item.unitPrice,
            quantity: item.quantity,
            paymentMethod: PaymentMethodEnum.CARD,
        }))

        await this._expenseService.recordItemsPurchases(
            expenseRecords,
            options
        )

        return newItems;
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
