import {Expose, Type} from "class-transformer";
import {IsArray, IsDate, IsEnum, IsNumber, ValidateNested} from "class-validator";
import {PaymentMethodEnum} from "@entities/enums";
import {OrderProductDto} from "@entities/dto/order.dto";

export class PaymentDto {

    @Expose()
    @IsNumber()
    id!: number;

    @Expose()
    @IsNumber()
    orderId!: number;

    @Expose()
    @IsNumber()
    totalPrice!: number;

    @Expose()
    @IsEnum(PaymentMethodEnum)
    paymentMethod!: PaymentMethodEnum;

    @Expose()
    @IsDate()
    transaction_date!: Date;
}


export class PaymentCheckDto {

    @Expose()
    @IsArray({each: true})
    @ValidateNested({ each: true })
    @Type(() => OrderProductDto)
    orderProducts!: OrderProductDto[];

    @Expose()
    @IsNumber()
    totalPrice!: number;

    @Expose()
    @IsEnum(PaymentMethodEnum)
    paymentMethod!: PaymentMethodEnum;

    @Expose()
    @IsDate()
    transactionDate!: Date;
}