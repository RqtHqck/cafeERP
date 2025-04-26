import {
    IsString,
    IsNotEmpty,
    IsEmail, IsNumber, IsEnum
} from 'class-validator';
import {Exclude, Expose} from "class-transformer";
import {RoleEnum} from "@entities/enums";


export class CreateEmployeeDto {

    @IsString()
    @IsNotEmpty()
    firstName!: string;

    @IsString()
    @IsNotEmpty()
    lastName!: string;

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;

    @IsString()
    @IsNotEmpty()
    @IsEnum(RoleEnum)
    roleName!: RoleEnum;
}


export class EmployeeDto {

    @Expose()
    @IsNumber()
    id!: number;

    @Expose()
    @IsString()
    @IsNotEmpty()
    firstName!: string;

    @Expose()
    @IsString()
    @IsNotEmpty()
    lastName!: string;

    @Expose()
    @IsString()
    @IsNotEmpty()
    email!: string;

    @Exclude()
    @IsString()
    @IsNotEmpty()
    passwordHash!: string;

    @Exclude()
    @IsString()
    @IsNotEmpty()
    hashSalt!: string;

    @Expose()
    @IsNumber()
    roleId!: number;
}
