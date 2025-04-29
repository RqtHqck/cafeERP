import {
    Table,
    Column,
    Model,
    AllowNull,
    ForeignKey, PrimaryKey, AutoIncrement, BelongsTo,
} from "sequelize-typescript";
import {InferAttributes, InferCreationAttributes, NonAttribute} from "sequelize";
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

    @BelongsTo(() => Product)
    product!: NonAttribute<Product>;

    @BelongsTo(() => Item)
    item!: NonAttribute<Item>;

}

export default ProductItems;