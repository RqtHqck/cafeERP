import { Request, Response, NextFunction } from 'express';
import {plainToInstance} from "class-transformer";
import {AddProductDto, ProductDto} from "@entities/dto/product.dto";
import {ProductService} from "@services/product.service";
import db from "@utils/sequelize.utility";

export class ProductController {

    private _productService: ProductService;

    constructor(productService: ProductService) {
        this._productService = productService;
    }


    async addProduct(req: Request, res: Response, next: NextFunction): Promise<any> {
        const transaction = await db.sequelize.transaction();

        try {
            const addProductDto = <AddProductDto>req.body
            const product = await this._productService.addProduct(addProductDto, { transaction });
            await transaction.commit();

            const responseProduct = plainToInstance(ProductDto, product, {
                excludeExtraneousValues: true,
            });

            return res
                .status(201)
                .json(responseProduct)
        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    }


    async getAllProducts(req: Request, res: Response, next: NextFunction): Promise<any> {

        try {
            const filters = req.query;
            const products = await this._productService.getProducts();

            const responseProducts = plainToInstance(ProductDto, products, {
                excludeExtraneousValues: true,
            });

            return res
                .status(200)
                .json(responseProducts)
        } catch (error) {
            next(error);
        }
    }
}
