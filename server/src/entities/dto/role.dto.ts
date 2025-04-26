import {
    IsString,
    IsNotEmpty,
    MaxLength, IsEmail, IsHash, IsNumber
} from 'class-validator';
import {Expose} from "class-transformer";


export class CreateRoleDto {

    @IsString()
    @IsNotEmpty()
    name!: string;
}


export class RoleDto {

    @Expose()
    @IsNumber()
    id!: number;

    @Expose()
    @IsString()
    @IsNotEmpty()
    name!: string;
}
