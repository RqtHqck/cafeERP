import {
    IsString,
    IsNotEmpty,
    IsEmail, IsEnum
} from 'class-validator';
import {RoleEnum} from "@entities/enums";

export class RegisterDto {

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


export class LoginDto{
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;
}

