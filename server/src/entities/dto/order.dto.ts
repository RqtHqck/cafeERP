import {IsArray, IsEnum, IsNotEmpty, IsNumber, IsString} from "class-validator";
import {PaymentMethodEnum} from "@entities/enums";
import {IOrderProductsDto, IProductItemDto} from "@entities/interfaces";
import {Exclude, Expose} from "class-transformer";

export class CreateOrderDto {

    @IsString()
    @IsNotEmpty()
    customerName!: string;

    @IsEnum(PaymentMethodEnum)
    @IsNotEmpty()
    paymentMethod!: PaymentMethodEnum;

    @IsArray()
    @IsNotEmpty()
    products!: IOrderProductsDto[]
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