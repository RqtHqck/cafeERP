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
import {PaymentMethodEnum, RoleEnum} from "@entities/enums";
import Order from "@models/order.model";
import Item from "@models/item.model";

@Table({
    timestamps: true,
    createdAt: 'transactionDate',
    updatedAt: false,
    tableName: 'expenses',
    modelName: 'Expense',
})
class Expense extends Model<InferAttributes<Expense>, InferCreationAttributes<Expense>> {
    @PrimaryKey
    @AutoIncrement
    @Column
    declare id: number;


    @AllowNull(false)
    @ForeignKey(() => Item)
    @Column({
        type: DataType.INTEGER,
        field: 'item_id'
    })
    declare itemId: number;


    @AllowNull(false)
    @Column({
        type: DataType.DECIMAL(10, 2),
        field: 'total_price'
    })
    declare totalPrice: number;


    @AllowNull(false)
    @Column({
        type: DataType.ENUM(...Object.values(PaymentMethodEnum)),
        field: 'payment_method'
    })
    declare paymentMethod: PaymentMethodEnum;


    @BelongsTo(() => Item)
    declare item: Item;
}

export default Expense;
