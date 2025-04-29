import {
    DataType,
    Model,
    Table,
    Column,
    PrimaryKey,
    AllowNull,
    AutoIncrement,
    Unique
} from 'sequelize-typescript';
import {InferAttributes, InferCreationAttributes} from "sequelize";
import {ItemUnitEnum} from "@entities/enums";


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
            max: 255
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
        type: DataType.FLOAT,
    })
    declare quantity: number;


    @AllowNull(false)
    @Column({
        type: DataType.FLOAT,
        field: 'min_threshold'
    })
    declare minThreshold: number;


    @AllowNull(false)
    @Column({
        type: DataType.FLOAT,
    })
    declare cost: number;
}

export default Item;
