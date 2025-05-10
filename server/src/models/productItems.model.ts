import {
    Table,
    Column,
    Model,
    AllowNull,
    ForeignKey, PrimaryKey, AutoIncrement, BelongsTo,
} from "sequelize-typescript";
import {DataTypes, InferAttributes, InferCreationAttributes, NonAttribute} from "sequelize";
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
        type: DataTypes.INTEGER,
        field: "item_id",
    })
    declare itemId: number;


    @AllowNull(false)
    @ForeignKey(() => Product)
    @Column({
        type: DataTypes.INTEGER,
        field: "product_id",
    })
    declare productId: number;


    @AllowNull(false)
    @Column({
        type: DataTypes.INTEGER,
    })
    declare quantity: number;


    @BelongsTo(() => Product)
    product!: NonAttribute<Product>;

    @BelongsTo(() => Item)
    declare item: NonAttribute<Item>;

}

export default ProductItems;