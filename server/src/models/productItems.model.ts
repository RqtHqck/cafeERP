import {
    Table,
    Column,
    Model,
    AllowNull,
    ForeignKey, PrimaryKey, AutoIncrement,
} from "sequelize-typescript";
import {InferAttributes, InferCreationAttributes} from "sequelize";
import Product from "@models/product.model";
import Item from "@models/item.model";


@Table({
    timestamps: false,
    tableName: "product_items",
    modelName: "ProductItems",
})
class ProductItems extends Model<InferAttributes<ProductItems>, InferCreationAttributes<ProductItems>> {

    @PrimaryKey
    @AutoIncrement
    @Column
    declare id: number;


    @AllowNull(false)
    @ForeignKey(() => Item)
    @Column({
        field: "item_id",
    })
    itemId!: number;


    @AllowNull(false)
    @ForeignKey(() => Product)
    @Column({
        field: "product_id",
    })
    productId!: number;
}

export default ProductItems;