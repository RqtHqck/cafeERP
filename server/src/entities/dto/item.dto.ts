import {IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import {ItemUnitEnum} from "@entities/enums";
import {Exclude, Expose} from "class-transformer";

export class AddItemDto {

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsNotEmpty()
    @IsEnum(ItemUnitEnum)
    unit!: ItemUnitEnum;

    @IsNumber()
    @IsNotEmpty()
    quantity!: number;

    @IsNumber()
    @IsNotEmpty()
    cost!: number;
}


export class UpdateItemDto {

    @IsString()
    @IsOptional()
    name?: string;

    @IsEnum(ItemUnitEnum)
    @IsOptional()
    unit?: ItemUnitEnum;

    @IsNumber()
    @IsOptional()
    quantity?: number;

    @IsNumber()
    @IsOptional()
    cost?: number;
}


export class ItemDto {

    @Expose()
    @IsNumber()
    id!: number;

    @Expose()
    @IsString()
    @IsNotEmpty()
    name!: string;

    @Expose()
    @IsNotEmpty()
    @IsEnum(ItemUnitEnum)
    unit!: ItemUnitEnum;

    @Expose()
    @IsNumber()
    @IsNotEmpty()
    quantity!: number;

    @Expose()
    @IsNumber()
    @IsNotEmpty()
    cost!: number;
}
