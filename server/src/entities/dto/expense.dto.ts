import {Exclude, Expose} from "class-transformer";
import {IsDate, IsEnum, IsNumber, IsString} from "class-validator";
import {ItemUnitEnum, PaymentMethodEnum} from "@entities/enums";

export class ExpenseDto {

    @Expose()
    @IsNumber()
    id!: number;

    @Expose()
    @IsNumber()
    itemId!: number;

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

export class ExpenseCheckDto {

    @Expose()
    @IsNumber()
    total_price!: number;

    @Expose()
    @IsEnum(PaymentMethodEnum)
    paymentMethod!: PaymentMethodEnum;

    @Expose()
    @IsDate()
    transaction_date!: Date;

    @Expose()
    @IsString()
    itemName!: string;

    @Expose()
    @IsEnum(ItemUnitEnum)
    itemUnit!: ItemUnitEnum;

    @Expose()
    @IsNumber()
    itemUnitPrice!: number;

    @Expose()
    @IsNumber()
    itemQuantity!: number;
}