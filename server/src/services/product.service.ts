import logger from "@utils/logger";
import {IItem, IProduct, IProductItem} from "@entities/interfaces";
import {ProductRepository} from "@repositories/product.repository";
import {AddProductDto, AddProductItemDto} from "@entities/dto/product.dto";
import {Transaction} from "sequelize";
import {ProductItemRepository} from "@repositories/productItem.repository";
import {ProductCategoryRepository} from "@repositories/productCategory.repository";
import ApiError from "@errors/ApiError";
import Item from "@models/item.model";
import Product from "@models/product.model";


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


    setProductsAvailableForOrder(productItems: IProductItem[]): IProductItem[] {
        // Группируем productItems по productId
        const productsMap = new Map<number, IProductItem[]>();

        // 1. Собираем все items для каждого продукта
        for (const productItem of productItems) {
            if (!productsMap.has(productItem.productId)) {
                productsMap.set(productItem.productId, []);
            }
            productsMap.get(productItem.productId)!.push(productItem);
        }

        // 2. Проверяем availability для каждого продукта
        for (const [productId, items] of productsMap) {
            let isAvailable = true;

            // Проверяем все items продукта
            for (const item of items) {
                if (item.quantity >= item.item!.quantity) {
                    isAvailable = false;
                    break; // Хотя бы одного не хватает → продукт недоступен
                }
            }

            // Обновляем available для всех items продукта
            for (const item of items) {
                item.product!.available = isAvailable;
            }
        }

        return productItems;
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
            quantity: item.quantity
        }))

        await this._productItemRepository.createMany(productItems, options)
    }


    async getProductItems(id: number): Promise<IProductItem[]> {
        logger.info("ProductService::getProductItems")

        const product = await this._productRepository.findByPk(id);
        if (!product) {
            throw ApiError.notFoundError("Product not found")
        }

        let productItems: any = await this._productItemRepository.findAll({
            where: { productId: id },
            attributes: ['quantity'],
            include: [
                {
                    model: Item,
                }
            ]
        })

        if (productItems.length === 0) {
            return []
        }

        productItems = productItems.map((productItem: IProductItem) => (
            {
                productId: id,
                quantity: productItem.quantity,
                item: productItem.item!
            }
        ))

        return productItems;
    }


    async getProducts(filters: object = {}): Promise<IProduct[]> {
        logger.info(`ProductService::getProducts`)

        return await this._productRepository.findAll(filters);
    }


    async getAvailableProducts(filters: object = {}): Promise<IProduct[]> {
        logger.info(`ProductService::getAvailableProducts`)

        let productItems: any = await this._productItemRepository.findAll(
            {
                include: [
                    { model: Item }, { model: Product }
                ],
                raw: true,
                nest: true
            }
        );

        productItems = this.setProductsAvailableForOrder(productItems);

        const products: IProduct[] = productItems.map((productItem: IProductItem) => ({
            id: productItem.product?.id,          // опционально
            name: productItem.product?.name || "", // защита от undefined
            description: productItem.product?.description || "",
            price: productItem.product?.price || 0,
            categoryId: productItem.product?.categoryId || 0,
            available: productItem.product?.available || false,
        }));

        return products
    }



    async getProductByPk(id: number): Promise<IProduct> {
        logger.info(`ProductService::getByPk`)

        return await this._productRepository.findByPk(id);
    }
}
