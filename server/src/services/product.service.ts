import logger from "@utils/logger";
import {IItem, IProduct, IProductItem} from "@entities/interfaces";
import {ProductRepository} from "@repositories/product.repository";
import {AddProductDto, AddProductItemDto} from "@entities/dto/product.dto";
import {Transaction} from "sequelize";
import {ProductItemRepository} from "@repositories/productItem.repository";
import {ProductCategoryRepository} from "@repositories/productCategory.repository";
import ApiError from "@errors/ApiError";
import Item from "@models/item.model";


export class ProductService {

    private _productRepository: ProductRepository;
    private _productItemRepository: ProductItemRepository;
    private _productCategoryRepository: ProductCategoryRepository;

    constructor() {
        this._productRepository = new ProductRepository();
        this._productItemRepository = new ProductItemRepository();
        this._productCategoryRepository = new ProductCategoryRepository();
    }


    calculateProductsTotalPrice(products: IProduct[]): number {
        return products.reduce((sum, product) => {
            sum += product.price;
            return sum;
        }, 0)
    }


    async addProduct(addProductDto: AddProductDto, options?: {transaction: Transaction}): Promise<IProduct> {
        logger.info("ProductService::addProduct")

        // Check if category exists
        const category = await this._productCategoryRepository.findByPk(addProductDto.categoryId);
        if (!category) {
            throw ApiError.badRequestError(`Category with id=${addProductDto.categoryId} not found`);
        }

        const existingByName = await this._productRepository.findOne({
            where: { name: addProductDto.name },
        });

        if (existingByName && existingByName.name === addProductDto.name) {
            throw ApiError.badRequestError("Product with the same name is already exists.")
        }

        const product: IProduct = {
            name: addProductDto.name,
            description: addProductDto.description,
            price: addProductDto.price,
            categoryId: addProductDto.categoryId
        }

        const productCreated: IProduct = await this._productRepository.add(product, {
            where: { name: product.name  },
            transaction: options?.transaction,
        })

        const items: AddProductItemDto[] | null = addProductDto.items || null;

        if (items) {
            await this.addProductItems(productCreated.id!, items, options)
        }

        return productCreated;
    }


    async addProductItems(productId: number, items: AddProductItemDto[], options?: {transaction: Transaction}): Promise<void> {
        logger.info("ProductService::addProductItems")

        const productItems = items.map((item: any): IProductItem => ({
            productId,
            itemId: item.itemId,
            amount: item.amount
        }))

        await this._productItemRepository.createMany(productItems, options)
    }


    async getProductItems(id: number): Promise<{ productId: number, items: { amount: number, item: IItem }[] }> {
        logger.info("ProductService::getProductItems")

        const resProductItems = { productId: id, items: [] };

        let productItems: any = await this._productItemRepository.findAll({
            where: { productId: id },
            attributes: ['amount'],
            include: [
                {
                    model: Item,
                }
            ]
        })

        if (productItems.length === 0) {
            return resProductItems
        }

        productItems = productItems.map((productItem: IProductItem): {amount: number, item: IItem} => (
            {
                amount: productItem.amount,
                item: productItem.item!
            }
        ))

        resProductItems.items = productItems;

        return productItems;
    }


    async getProducts(filters: object = {}): Promise<IProduct[]> {
        logger.info(`ProductService::getProducts`)

        return await this._productRepository.findAll(filters);
    }


    async getProductByPk(id: number): Promise<IProduct> {
        logger.info(`ProductService::getByPk`)

        return await this._productRepository.findByPk(id);
    }
}
