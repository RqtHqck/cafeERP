    import {
    DataType,
    Model,
    Table,
    Column,
    PrimaryKey,
    AllowNull,
    AutoIncrement,
    BelongsToMany,
    Unique, ForeignKey, HasOne
} from 'sequelize-typescript';
    import {InferAttributes, InferCreationAttributes, NonAttribute} from "sequelize";
    import Product from "@models/product.model";
    import OrderProducts from "@models/orderProducts.model";
    import Employee from "@models/employee.model";
    import Payment from "@models/payment.model";


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


    @Unique
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
    @Column({
        type: DataType.FLOAT,
        validate: {
            min: 0.01
        }
    })
    declare price: number;


    @AllowNull(false)
    @ForeignKey(() => Employee)
    @Column({
        field: 'employee_id'
    })
    employeeId!: number;


    @BelongsToMany(() => Product, () => OrderProducts)
    products!: NonAttribute<Product[]>;


    @HasOne(() => Payment, {
        foreignKey: 'order_id'
    })
    declare payment: NonAttribute<Payment>;
}

export default Order;
