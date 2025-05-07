import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AllowNull, AutoIncrement,
    Unique, ForeignKey, BelongsTo
} from 'sequelize-typescript';
import {InferAttributes, InferCreationAttributes} from "sequelize";
import {ItemUnitEnum, PaymentMethodEnum, RoleEnum} from "@entities/enums";
import Order from "@models/order.model";

@Table({
    timestamps: true,
    createdAt: 'transactionDate',
    updatedAt: false,
    tableName: 'payments',
    modelName: 'Payment',
})
class Payment extends Model<InferAttributes<Payment>, InferCreationAttributes<Payment>> {
    @PrimaryKey
    @AutoIncrement
    @Column
    declare id: number;


    @AllowNull(false)
    @ForeignKey(() => Order)
    @Column({
        type: DataType.INTEGER,
        field: 'order_id'
    })
    declare orderId: number;


    @AllowNull(false)
    @Column({
        type: DataType.FLOAT,
        field: "total_price"
    })
    declare total_price: number;


    @AllowNull(false)
    @Column({
        type: DataType.ENUM(...Object.values(PaymentMethodEnum)),
        field: 'payment_method'
    })
    declare paymentMethod: PaymentMethodEnum;


    @BelongsTo(() => Order)
    declare order: Order;
}

export default Payment;
