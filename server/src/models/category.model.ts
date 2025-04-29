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
import {CategoryEnum} from "@entities/enums";
import Product from "@models/product.model";


@Table({
    timestamps: false,
    tableName: 'categories',
    modelName: 'Category',
})
class Category extends Model<InferAttributes<Category>, InferCreationAttributes<Category>> {
    @PrimaryKey
    @AutoIncrement
    @Column
    declare id: number;


    @Unique
    @AllowNull(false)
    @Column({
        type: DataType.ENUM(...Object.values(CategoryEnum)),
    })
    declare name: CategoryEnum;


    @HasMany(() => Product, {
        foreignKey: 'category_id'
    })
    declare products: NonAttribute<Product[]>;
}

export default Category;
