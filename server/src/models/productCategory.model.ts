import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AllowNull, AutoIncrement,
    Unique, HasMany
} from 'sequelize-typescript';
import {InferAttributes, InferCreationAttributes, NonAttribute} from "sequelize";
import {ProductCategoryEnum} from "@entities/enums";
import Product from "@models/product.model";


@Table({
    timestamps: false,
    tableName: 'product_categories',
    modelName: 'ProductCategory',
})
class ProductCategory extends Model<InferAttributes<ProductCategory>, InferCreationAttributes<ProductCategory>> {
    @PrimaryKey
    @AutoIncrement
    @Column
    declare id: number;


    @Unique
    @AllowNull(false)
    @Column({
        type: DataType.ENUM(...Object.values(ProductCategoryEnum)),
    })
    declare name: ProductCategoryEnum;


    @HasMany(() => Product, {
        foreignKey: 'category_id'
    })
    declare products: NonAttribute<Product[]>;
}

export default ProductCategory;
