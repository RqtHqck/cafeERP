import {IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested} from "class-validator";
import {Exclude, Expose, Type} from "class-transformer";
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
    @ValidateNested({ each: true })
    @Type(() => AddProductItemDto)
    items?: AddProductItemDto[]
}

export class AddProductItemDto {
    @IsNumber()
    quantity!: number;

    @IsNumber()
    itemId!: number;
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

    @Expose()
    @IsBoolean()
    available!: boolean;
}


export class ProductItemDto {
    @Expose()
    @IsNumber()
    productId!: number;

    @Expose()
    @IsNumber()
    quantity!: number;

    @Expose()
    @IsOptional()
    @Type(() => ItemDto)
    item?: ItemDto;
}