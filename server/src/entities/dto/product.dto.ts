import {IsArray, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import {Exclude, Expose, Type} from "class-transformer";
import {IProductItemDto} from "@entities/interfaces";
import {ItemDto} from "@entities/dto/item.dto";

export class AddProductDto {

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsNumber()
    @IsNotEmpty()
    price!: number;

    @IsNumber()
    @IsNotEmpty()
    categoryId!: number;

    @IsArray()
    @IsOptional()
    items?: IProductItemDto[]
}


export class ProductDto {

    @Expose()
    @IsNumber()
    id!: number;

    @Expose()
    @IsString()
    @IsNotEmpty()
    name!: string;

    @Expose()
    @IsString()
    @IsNotEmpty()
    description!: string;

    @Expose()
    @IsNumber()
    @IsNotEmpty()
    price!: number;

    @Expose()
    @IsNumber()
    categoryId!: string;

    @Exclude()
    @IsNumber()
    category_id!: string;
}


export class ProductItemsDto {
    @Expose()
    @IsNumber()
    productId!: number;

    @Expose()
    @IsNumber()
    amount!: number;

    @Expose()
    @IsOptional()
    @Type(() => ItemDto)
    item?: ItemDto;
}