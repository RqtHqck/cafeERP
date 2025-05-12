import {IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import {ItemUnitEnum, PaymentMethodEnum} from "@entities/enums";
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
    unitPrice!: number;

    @IsNumber()
    @IsNotEmpty()
    quantity!: number;

    @IsEnum(PaymentMethodEnum)
    @IsNotEmpty()
    paymentMethod!: PaymentMethodEnum;
}


export class UpdateItemDto {

    @IsString()
    @IsOptional()
    name?: string;

    @IsEnum(ItemUnitEnum)
    @IsOptional()
    unit?: ItemUnitEnum;
}


export class ItemDto {

    @Expose()
    @IsNumber()
    id!: number;

    @Expose()
    @IsString()
    name!: string;

    @Expose()
    @IsEnum(ItemUnitEnum)
    unit!: ItemUnitEnum;

    @Expose()
    @IsNumber()
    unitPrice!: number;

    @Expose()
    @IsNumber()
    quantity!: number;
}
