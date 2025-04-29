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
import {RoleEnum} from "@entities/enums";
import Order from "@models/order.model";

@Table({
    timestamps: true,
    createdAt: 'transaction_date',
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
    })
    declare amount: number;


    @AllowNull(false)
    @Column({
        type: DataType.STRING,
        field: 'payment_method'
    })
    declare paymentMethod: string;

    @BelongsTo(() => Order)
    declare order: Order;
}

export default Payment;
