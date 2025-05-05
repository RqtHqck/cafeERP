import {
    Table,
    Column,
    Model,
    AllowNull,
    ForeignKey, PrimaryKey, AutoIncrement, DataType, Default,
} from "sequelize-typescript";
import Order from "@models/order.model";
import Product from "@models/product.model";
import {InferAttributes, InferCreationAttributes} from "sequelize";
import OrderStatus from "@models/orderStatus.model";


@Table({
    timestamps: true,
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
        field: "order_id",
    })
    declare orderId: number;


    @AllowNull(false)
    @ForeignKey(() => OrderStatus)
    @Column({
        field: "status_id",
    })
    declare statusId: number;
}

export default OrderStatusesHistory;