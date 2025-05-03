
import logger from "@utils/logger";
import {IItem, IProduct, IProductItem, IProductItemDto} from "@entities/interfaces";
import {ProductRepository} from "@repositories/product.repository";
import {AddProductDto} from "@entities/dto/product.dto";
import {Transaction} from "sequelize";
import {ProductItemRepository} from "@repositories/productItem.repository";


export class ProductService {

    private _productRepository: ProductRepository;
    private _productItemRepository: ProductItemRepository;

    constructor() {
        this._productRepository = new ProductRepository();
        this._productItemRepository = new ProductItemRepository();
    }


    async addProduct(addProductDto: AddProductDto, options?: {transaction: Transaction}) {
        logger.info("ProductService::addProduct")

        const product: IProduct = {
            name: addProductDto.name,
            description: addProductDto.description,
            price: addProductDto.price,
            categoryId: addProductDto.categoryId
        }

        const productCreated: IProduct = await this._productRepository.add({
            where: { name: product.name  },
            transaction: options?.transaction,
            defaults: product
        })
        console.log(productCreated)

        const items: IProductItemDto[] | null = addProductDto.items || null;
        if (items) {
            await this.addProductItems(productCreated.id!, items, options)
        }

        return productCreated;
    }


    async addProductItems(productId: number, items: IProductItemDto[], options?: {transaction: Transaction}) {
        logger.info("ProductService::addProductItems")

        const productItems: IProductItem[] = items.map((item: IProductItemDto): IProductItem => ({
            productId,
            itemId: item.itemId,
            amount: item.amount
        }))

        console.log(productItems)

        await this._productItemRepository.createMany(productItems, options)

    }
}
