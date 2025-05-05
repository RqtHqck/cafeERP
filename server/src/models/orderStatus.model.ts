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
import {OrderStatusEnum} from "@entities/enums";
import Order from "@models/order.model";


@Table({
    timestamps: false,
    tableName: 'order_statuses',
    modelName: 'OrderStatus',
})
class OrderStatus extends Model<InferAttributes<OrderStatus>, InferCreationAttributes<OrderStatus>> {
    @PrimaryKey
    @AutoIncrement
    @Column
    declare id: number;


    @Unique
    @AllowNull(false)
    @Column({
        type: DataType.ENUM(...Object.values(OrderStatusEnum)),
    })
    declare name: OrderStatusEnum;


    @HasMany(() => Order, {
        foreignKey: 'status_id'
    })
    declare orders: NonAttribute<Order[]>;
}

export default OrderStatus;
