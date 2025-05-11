import {
    Table,
    Column,
    Model,
    AllowNull,
    ForeignKey, PrimaryKey, AutoIncrement, DataType, BelongsTo,
} from "sequelize-typescript";
import Order from "@models/order.model";
import Product from "@models/product.model";
import {InferAttributes, InferCreationAttributes, NonAttribute} from "sequelize";


@Table({
    timestamps: false,
    tableName: "order_products",
    modelName: "OrderProduct",
})
class OrderProduct extends Model<InferAttributes<OrderProduct>, InferCreationAttributes<OrderProduct>> {

    @PrimaryKey
    @AutoIncrement
    @Column
    declare id: number;


    @AllowNull(false)
    @ForeignKey(() => Order)
    @Column({
        field: "order_id",
    })
    declare orderId: number;


    @AllowNull(false)
    @ForeignKey(() => Product)
    @Column({
        field: "product_id",
    })
    declare productId: number;


    @AllowNull(false)
    @Column({
        type: DataType.INTEGER,
        defaultValue: 1
    })
    declare quantity: number;

    @BelongsTo(() => Product)
    declare product: NonAttribute<Product>;

    @BelongsTo(() => Order)
    declare order: NonAttribute<Order>;
}

export default OrderProduct;