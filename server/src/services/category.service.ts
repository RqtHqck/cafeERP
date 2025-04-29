import logger from "@utils/logger";
import {CategoryEnum} from "@entities/enums";
import {CategoryRepository} from "@repositories/category.repository";
import {ICategory} from "@entities/interfaces";

export class CategoryService {

    private _categoryRepository: CategoryRepository;

    constructor() {
        this._categoryRepository = new CategoryRepository();
    }


    async createMany() {
        logger.info("CategoryService::createMany")
        const allowedCategoryNames = [...Object.values(CategoryEnum)]
        // Create roles by enum
        let categories: ICategory[] = allowedCategoryNames.map((name: CategoryEnum): ICategory => ({ name }));
        await this._categoryRepository.createMany(categories);
    }
}