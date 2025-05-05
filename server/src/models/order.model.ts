import {
DataType,
Model,
Table,
Column,
PrimaryKey,
AllowNull,
AutoIncrement,
BelongsToMany,
ForeignKey, HasOne, BelongsTo
} from 'sequelize-typescript';
import {InferAttributes, InferCreationAttributes, NonAttribute} from "sequelize";
import Product from "@models/product.model";
import OrderProducts from "@models/orderProducts.model";
import Employee from "@models/employee.model";
import Payment from "@models/payment.model";
import OrderStatus from "@models/orderStatus.model";


@Table({
    timestamps: false,
    tableName: 'orders',
    modelName: 'Order',
})
class Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> {

    @PrimaryKey
    @AutoIncrement
    @Column
    declare id: number;


    @AllowNull(false)
    @Column({
        type: DataType.STRING(255),
        field: 'customer_name',
        validate: {
            notEmpty: true,
            len: [1, 255]
        },
    })
    declare customerName: string;


    @AllowNull(false)
    @ForeignKey(() => Employee)
    @Column({
        field: 'employee_id'
    })
    declare employeeId: number;


    @AllowNull(false)
    @ForeignKey(() => OrderStatus)
    @Column({
        field: 'status_id'
    })
    declare statusId: number;


    @BelongsToMany(() => Product, () => OrderProducts)
    declare products: NonAttribute<Product[]>;


    @BelongsTo(() => Employee, {
        foreignKey: 'employee_id',
        targetKey: 'id'
    })
    declare employee: NonAttribute<Employee>;


    @BelongsTo(() => OrderStatus, {
        foreignKey: 'status_id',
        targetKey: 'id'
    })
    declare orderStatus: NonAttribute<OrderStatus>;


    @HasOne(() => Payment, {
        foreignKey: 'order_id'
    })
    declare payment: NonAttribute<Payment>;
}

export default Order;
