import {
    DataType,
    Model,
    Table,
    Column,
    PrimaryKey,
    AllowNull,
    AutoIncrement,
    ForeignKey, BelongsTo, Unique, BelongsToMany
} from 'sequelize-typescript';
import ProductCategory from "@models/productCategory.model";
import {InferAttributes, InferCreationAttributes, NonAttribute} from "sequelize";
import OrderProducts from "@models/orderProducts.model";
import Order from "@models/order.model";


@Table({
    timestamps: true,
    updatedAt: false,
    tableName: 'products',
    modelName: 'Product',
})
class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {

    @PrimaryKey
    @AutoIncrement
    @Column
    declare id: number;


    @Unique
    @AllowNull(false)
    @Column({
        type: DataType.STRING(255),
        validate: {
            notEmpty: true,
            len: [1, 255]
        },
    })
    declare name: string;


    @AllowNull(false)
    @Column({
        type: DataType.STRING(255),
        validate: {
            notEmpty: true,
            max: 255
        },
    })
    declare description: string;


    @AllowNull(false)
    @Column({
        type: DataType.DECIMAL(10, 2),
        validate: {
            min: 0.01
        }
    })
    declare price: number;


    @AllowNull(false)
    @ForeignKey(() => ProductCategory)
    @Column({
        type: DataType.INTEGER,
        field: 'category_id'
    })
    declare categoryId: number;


    @BelongsTo(() => ProductCategory, {
        foreignKey: 'category_id',
        targetKey: 'id'
    })
    declare category: NonAttribute<ProductCategory>;

    @BelongsToMany(() => Order, () => OrderProducts)
    declare orders: NonAttribute<Order[]>;
}

export default Product;