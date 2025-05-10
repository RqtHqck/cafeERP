import logger from "@utils/logger";
import {ProductCategoryEnum} from "@entities/enums";
import {ProductCategoryRepository} from "@repositories/productCategory.repository";
import {IProductCategory} from "@entities/interfaces";

export class ProductCategoryService {

    private _productCategoryRepository: ProductCategoryRepository;

    constructor() {
        this._productCategoryRepository = new ProductCategoryRepository();
    }


    async createMany(): Promise<void> {
        logger.info("CategoryService::createMany")
        const allowedCategoryNames = [...Object.values(ProductCategoryEnum)]
        // Create roles by enum
        let categories: IProductCategory[] = allowedCategoryNames.map((name: ProductCategoryEnum): IProductCategory => ({ name }));
        await this._productCategoryRepository.createMany(categories);
    }
}