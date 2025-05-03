import {IsArray, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import {Exclude, Expose} from "class-transformer";
import {IProductItemDto} from "@entities/interfaces";

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
