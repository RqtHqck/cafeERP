import logger from "@utils/logger";
import {IExpense, IItem, IItemUpdate, IProductItem} from "@entities/interfaces";
import {AddItemDto, UpdateItemDto} from "@entities/dto/item.dto";
import {ItemRepository} from "@repositories/item.repository";
import {Transaction} from "sequelize";
import {ItemUnitEnum, PaymentMethodEnum} from "@entities/enums";
import {AddOrderProductDto} from "@entities/dto/order.dto";
import ApiError from "@errors/ApiError";
import {ExpenseRepository} from "@repositories/expense.repository";


export class ItemService {

    private _itemRepository: ItemRepository;
    private _expenseRepository: ExpenseRepository;


    constructor() {
        this._itemRepository = new ItemRepository();
        this._expenseRepository = new ExpenseRepository();
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

        const expenseRecord: IExpense = {
            itemId: newItem.id!,
            totalPrice: newItem.unitPrice * newItem.quantity,
            paymentMethod: addItemDto.paymentMethod,
        };

        await this._expenseRepository.create(
            expenseRecord,
            options
        )
        return newItem;
    }


    async deductFromItemsQuantity(productsInput: AddOrderProductDto[], productItems: IProductItem[], options: { transaction: Transaction }): Promise<void> {
        logger.info("ItemService::deductFromItemsQuantity")

        //
        const inputProductQuantityMap = new Map(productsInput.map(p => [p.productId, p.quantity]));

        for (const { productId, itemId, item, quantity: productItemQuantity } of productItems) {
            const inputProductQuantity = inputProductQuantityMap.get(productId);
            if (inputProductQuantity === undefined) throw new Error("Missing input quantity");

            const totalNeeded = productItemQuantity * inputProductQuantity;

            logger.info(`prodId: ${productId}, itemId: ${itemId}, inputProductQuantity: ${inputProductQuantity}, 
            productItemQty: ${productItemQuantity}, itemQty: ${item!.quantity}, totalNeeded: ${totalNeeded},` )

            if (item!.quantity < totalNeeded) throw ApiError.conflictError("Not enough items");

            item!.quantity -= totalNeeded;
            logger.info(`itemQty: ${item!.quantity}`)
        }

        const items = productItems.map((pi)=>(pi.item!))
        await this.updateManyItems(items, options);
    }


    async addManyItems(addItemsDtos: AddItemDto[], options: { transaction: Transaction }) {
        logger.info("ItemService::addManyItems")

        const items: IItem[] = addItemsDtos.map((item) => ({
            name: item.name,
            unit: item.unit as ItemUnitEnum,
            unitPrice: item.unitPrice,
            quantity: item.quantity
        }))

        const newItems = await this._itemRepository.addMany(items, {
            validate: true,
            transaction: options.transaction
        });

        // Add more then one only with card
        const expenseRecords: IExpense[] = newItems.map((item: IItem) => ({
            itemId: item.id!,
            totalPrice: item.unitPrice * item.quantity,
            paymentMethod: PaymentMethodEnum.CARD,
        }))

        await this._expenseRepository.createMany(
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
                returning: true,
            },
        );
    }

    async updateManyItems(items: IItem[], options: { transaction: Transaction }): Promise<void> {
        await Promise.all(items.map(async item => {

            const itemUpdate: IItemUpdate = {
                quantity: item.quantity,
            }

            await this._itemRepository.update(
                itemUpdate,
                {
                    where: {id: item.id},
                    returning: true,
                    transaction: options.transaction
                },
            );
        }))
    }

    async getItems(filters: object = {}) {
        logger.info(`ItemService::getItems`)

        return await this._itemRepository.findAll(filters);
    }


    async findItemByPk(id: number) {
        logger.info(`ItemService::findItemByPk`)

        return await this._itemRepository.findByPk(id);
    }
}
