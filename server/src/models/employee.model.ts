import {
    DataType,
    Model,
    Table,
    Column,
    PrimaryKey,
    AllowNull,
    AutoIncrement,
     NotNull, ForeignKey, BelongsTo, Unique
} from 'sequelize-typescript';
import Role from "@models/role.model";
import {InferAttributes, InferCreationAttributes} from "sequelize";


@Table({
    timestamps: false,
    paranoid: false,
    tableName: 'employees',
    modelName: 'Employee',
})
class Employee extends Model<InferAttributes<Employee>, InferCreationAttributes<Employee>> {

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
        field: 'first_name'
    })
    declare firstName: string;


    @Unique
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


    @AllowNull(false)
    @NotNull
    @Column({
        type: DataType.STRING,
    })
    declare email: string;


    @AllowNull(false)
    @NotNull
    @Column({
        type: DataType.STRING,
        field: 'password_hash'
    })
    declare passwordHash: string;


    @AllowNull(false)
    @NotNull
    @Column({
        type: DataType.STRING,
        field: 'hash_salt'
    })
    declare hashSalt: string;


    @AllowNull(false)
    @NotNull
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
    declare role: Role;
}

export default Employee;