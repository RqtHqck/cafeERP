import {
    IsString,
    IsNotEmpty,
    IsEmail, IsEnum
} from 'class-validator';
import {RoleEnum} from "@entities/enums";


export class LoginDto{
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;
}

