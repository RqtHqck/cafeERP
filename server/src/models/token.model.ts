import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AllowNull, AutoIncrement, ForeignKey, BelongsTo
} from 'sequelize-typescript';
import Employee from "@models/employee.model";
import {InferAttributes, InferCreationAttributes, NonAttribute} from "sequelize";


@Table({
    timestamps: true,
    tableName: 'tokens',
    modelName: 'Token',
})
class Token extends Model<InferAttributes<Token>, InferCreationAttributes<Token>> {

    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;


    @AllowNull(false)
    @ForeignKey(() => Employee)
    @Column({
        type: DataType.INTEGER,
        unique: true,
        onDelete: 'CASCADE',
        field: 'employee_id',
    })
    employeeId!: number;


    @AllowNull(false)
    @Column({
        type: DataType.STRING,
        field: 'refresh_token'
    })
    refreshToken!: string;


    @BelongsTo(
        () => Employee, {
            foreignKey: 'employeeId', targetKey: 'id'
        }
    )
    employee!: NonAttribute<Employee>;
}

export default Token;