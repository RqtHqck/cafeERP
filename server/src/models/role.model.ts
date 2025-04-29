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
import {RoleEnum} from "@entities/enums";
import Employee from "@models/employee.model";


@Table({
    timestamps: false,
    tableName: 'roles',
    modelName: 'Role',
})
class Role extends Model<InferAttributes<Role>, InferCreationAttributes<Role>> {
    @PrimaryKey
    @AutoIncrement
    @Column
    declare id: number;


    @Unique
    @AllowNull(false)
    @Column({
        type: DataType.ENUM(...Object.values(RoleEnum)),
    })
    declare name: RoleEnum;


    @HasMany(() => Employee, {
        foreignKey: 'role_id'
    })
    declare employees: NonAttribute<Employee[]>;
}

export default Role;
