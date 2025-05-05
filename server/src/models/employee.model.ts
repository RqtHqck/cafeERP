import {
    DataType,
    Model,
    Table,
    Column,
    PrimaryKey,
    AllowNull,
    AutoIncrement,
    NotNull, ForeignKey, BelongsTo, Unique, HasMany
} from 'sequelize-typescript';
import Role from "@models/role.model";
import {InferAttributes, InferCreationAttributes, NonAttribute} from "sequelize";
import Order from "@models/order.model";
import Product from "@models/product.model";


@Table({
    timestamps: true,
    tableName: 'employees',
    modelName: 'Employee',
})
class Employee extends Model<InferAttributes<Employee>, InferCreationAttributes<Employee>> {

    @PrimaryKey
    @AutoIncrement
    @Column
    declare id: number;


    @AllowNull(false)
    @Column({
        type: DataType.STRING(255),
        validate: {
            notEmpty: true,
            max: 255
        },
        field: 'first_name'
    })
    declare firstName: string;


    @AllowNull(false)
    @Column({
        type: DataType.STRING(255),
        validate: {
            notEmpty: true,
            max: 255
        },
        field: 'last_name'
    })
    declare lastName: string;


    @Unique
    @AllowNull(false)
    @Column({
        type: DataType.STRING,
    })
    declare email: string;


    @AllowNull(false)
    @Column({
        type: DataType.STRING,
        field: 'password_hash'
    })
    declare passwordHash: string;


    @AllowNull(false)
    @Column({
        type: DataType.STRING,
        field: 'hash_salt'
    })
    declare hashSalt: string;


    @AllowNull(false)
    @ForeignKey(() => Role)
    @Column({
        type: DataType.INTEGER,
        field: 'role_id'
    })
    declare roleId: number;


    @BelongsTo(() => Role, {
        foreignKey: 'role_id',
        targetKey: 'id'
    })
    declare role: NonAttribute<Role>;


    @HasMany(() => Order, {
        foreignKey: 'employee_id'
    })
    declare orders: NonAttribute<Order[]>;

}

export default Employee;