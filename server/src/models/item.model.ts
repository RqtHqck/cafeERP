import {
    DataType,
    Model,
    Table,
    Column,
    PrimaryKey,
    AllowNull,
    AutoIncrement,
    Unique, HasOne
} from 'sequelize-typescript';
import {InferAttributes, InferCreationAttributes, NonAttribute} from "sequelize";
import {ItemUnitEnum} from "@entities/enums";
import Payment from "@models/payment.model";
import Expense from "@models/expense.model";


@Table({
    timestamps: false,
    tableName: 'items',
    modelName: 'Item',
})
class Item extends Model<InferAttributes<Item>, InferCreationAttributes<Item>> {

    @PrimaryKey
    @AutoIncrement
    @Column
    declare id: number;


    @Unique
    @AllowNull(false)
    @Column({
        type: DataType.STRING(255),
        validate: {
            notEmpty: true,
            len: [1, 255]
        },
    })
    declare name: string;


    @AllowNull(false)
    @Column({
        type: DataType.ENUM(...Object.values(ItemUnitEnum)),
    })
    declare unit: ItemUnitEnum;


    @AllowNull(false)
    @Column({
        type: DataType.DECIMAL(10, 2),
    })
    declare price: number;


    @AllowNull(false)
    @Column({
        type: DataType.INTEGER,
    })
    declare quantity: number;


    @HasOne(() => Expense, {
        foreignKey: 'item_id'
    })
    declare expense: NonAttribute<Expense>;
}

export default Item;
