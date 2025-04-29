import {
    Table,
    Column,
    Model,
    AllowNull,
    ForeignKey, PrimaryKey, AutoIncrement,
} from "sequelize-typescript";
import Order from "@models/order.model";
import Product from "@models/product.model";
import {InferAttributes, InferCreationAttributes} from "sequelize";


@Table({
    timestamps: false,
    tableName: "order_products",
    modelName: "OrderProduct",
})
class OrderProducts extends Model<InferAttributes<OrderProducts>, InferCreationAttributes<OrderProducts>> {

    @PrimaryKey
    @AutoIncrement
    @Column
    declare id: number;


    @AllowNull(false)
    @ForeignKey(() => Order)
    @Column({
        field: "order_id",
    })
    orderId!: number;


    @AllowNull(false)
    @ForeignKey(() => Product)
    @Column({
        field: "product_id",
    })
    productId!: number;
}

export default OrderProducts;