import {
    Table,
    Column,
    Model,
    AllowNull,
    ForeignKey, PrimaryKey, AutoIncrement, DataType, Default, BelongsTo,
} from "sequelize-typescript";
import Order from "@models/order.model";
import Product from "@models/product.model";
import {InferAttributes, InferCreationAttributes, NonAttribute} from "sequelize";
import OrderStatus from "@models/orderStatus.model";
import Item from "@models/item.model";


@Table({
    createdAt: true,
    updatedAt: false,
    tableName: "order_statuses_history",
    modelName: "OrderStatusesHistory",
})
class OrderStatusesHistory extends Model<InferAttributes<OrderStatusesHistory>, InferCreationAttributes<OrderStatusesHistory>> {

    @PrimaryKey
    @AutoIncrement
    @Column
    declare id: number;


    @AllowNull(false)
    @ForeignKey(() => Order)
    @Column({
        type: DataType.INTEGER,
        field: "order_id",
    })
    declare orderId: number;


    @AllowNull(false)
    @ForeignKey(() => OrderStatus)
    @Column({
        type: DataType.INTEGER,
        field: "status_id",
    })
    declare statusId: number;


    @BelongsTo(() => Order)
    declare order: NonAttribute<Order>;


    @BelongsTo(() => OrderStatus)
    declare orderStatus: NonAttribute<OrderStatus>;
}

export default OrderStatusesHistory;