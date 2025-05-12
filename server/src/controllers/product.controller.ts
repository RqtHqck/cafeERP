import { Request, Response, NextFunction } from 'express';
import {plainToInstance} from "class-transformer";
import {AddProductDto, ProductDto, ProductItemDto} from "@entities/dto/product.dto";
import {ProductService} from "@services/product.service";
import db from "@utils/sequelize.utility";
import {OrderDto} from "@entities/dto/order.dto";


export class ProductController {

    private _productService: ProductService;

    constructor(productService: ProductService) {
        this._productService = productService;
    }


    async addProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        const transaction = await db.sequelize.transaction();

        try {
            const addProductDto = <AddProductDto>req.body

            const product = await this._productService.addProduct(addProductDto, { transaction });

            const responseProduct = plainToInstance(ProductDto, product, {
                excludeExtraneousValues: true,
            });

            await transaction.commit();

            res
                .status(201)
                .json(responseProduct)
        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    }


    async getAllProducts(req: Request, res: Response, next: NextFunction): Promise<void>{

        try {
            const filters = req.query;

            const products = await this._productService.getProducts();

            const responseProducts = plainToInstance(ProductDto, products, {
                excludeExtraneousValues: true,
            });

            res
                .status(200)
                .json(responseProducts)
        } catch (error) {
            next(error);
        }
    }


    async getAvailableProducts(req: Request, res: Response, next: NextFunction): Promise<void>{

        try {
            const filters = req.query;

            const availableProducts = await this._productService.getProductsWithAvailability();

            const responseProducts = plainToInstance(ProductDto, availableProducts, {
                excludeExtraneousValues: true,
            });

            res
                .status(200)
                .json(responseProducts)
        } catch (error) {
            next(error);
        }
    }


    async getProductItems(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            const id = parseInt(req.params.id as string, 10);

            const productItems = await this._productService.getProductItemsById(id);

            const responseProductItems = plainToInstance(ProductItemDto, productItems, {
                excludeExtraneousValues: true,
            });

            res
                .status(200)
                .json(responseProductItems)
        } catch (error) {
            next(error);
        }
    }


    async getProductByPk(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            const id = parseInt(req.params.id as string, 10);

            const product = await this._productService.getProductByPk(id);

            const responseProduct = plainToInstance(ProductDto, product, {
                excludeExtraneousValues: true,
            });

            res
                .status(200)
                .json(responseProduct)
        } catch (error) {
            next(error);
        }
    }
}
