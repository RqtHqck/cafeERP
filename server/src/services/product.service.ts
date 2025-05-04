import logger from "@utils/logger";
import {IProduct, IProductItem, IProductItemDto} from "@entities/interfaces";
import {ProductRepository} from "@repositories/product.repository";
import {AddProductDto} from "@entities/dto/product.dto";
import {Transaction} from "sequelize";
import {ProductItemRepository} from "@repositories/productItem.repository";
import {CategoryRepository} from "@repositories/category.repository";
import ApiError from "@errors/ApiError";


export class ProductService {

    private _productRepository: ProductRepository;
    private _productItemRepository: ProductItemRepository;
    private _categoryRepository: CategoryRepository;

    constructor() {
        this._productRepository = new ProductRepository();
        this._productItemRepository = new ProductItemRepository();
        this._categoryRepository = new CategoryRepository();

    }


    async addProduct(addProductDto: AddProductDto, options?: {transaction: Transaction}) {
        logger.info("ProductService::addProduct")

        // Check if category exists
        const category = await this._categoryRepository.findByPk(addProductDto.categoryId);
        console.log(category)
        if (!category) {
            throw ApiError.badRequestError(`Category with id=${addProductDto.categoryId} not found`);
        }

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


    async getProducts(filters: object = {}) {
        logger.info(`ProductService::getProducts`)

        return await this._productRepository.findAll(filters);
    }


    async getByPk(id: number) {
        logger.info(`ProductService::getByPk`)

        return await this._productRepository.findByPk(id);
    }
}
