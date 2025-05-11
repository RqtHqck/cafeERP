import {
    ArrayMinSize,
    IsArray,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    ValidateNested
} from "class-validator";
import {PaymentMethodEnum} from "@entities/enums";
import {Exclude, Expose, Type} from "class-transformer";
import {ProductDto} from "@entities/dto/product.dto";

export class CreateOrderDto {

    @IsString()
    @IsNotEmpty()
    customerName!: string;

    @IsEnum(PaymentMethodEnum)
    @IsNotEmpty()
    paymentMethod!: PaymentMethodEnum;

    @IsArray()
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    @Type(() => AddOrderProductDto)
    products!: AddOrderProductDto[]
}


export class AddOrderProductDto {
    @IsNumber()
    quantity!: number;

    @IsNumber()
    productId!: number;
}


export class UpdateOrderDto {

    @IsOptional()
    @IsString()
    customerName?: string;

    @IsOptional()
    @IsEnum(PaymentMethodEnum)
    paymentMethod?: PaymentMethodEnum;

    @IsOptional()
    @IsArray()
    products?: OrderProductDto[]

    @IsOptional()
    @IsNumber()
    statusId!: number;
}


export class OrderProductDto {
    @Expose()
    @IsNumber()
    orderId!: number;

    @Expose()
    @IsNumber()
    quantity!: number;

    @Expose()
    @Type(() => ProductDto)
    product?: ProductDto;
}


export class PatchChangeOrderStatusDto {
    @IsNumber()
    @IsNotEmpty()
    statusId!: number;
}


export class OrderDto {

    @Expose()
    @IsString()
    customerName!: string;

    @Expose()
    @IsNumber()
    price!: number;

    @Expose()
    @IsNumber()
    statusId!: number;

    @Exclude()
    @IsNumber()
    employeeId!: number;
}