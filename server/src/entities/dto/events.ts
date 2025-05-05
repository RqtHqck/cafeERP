import {Transaction} from "sequelize";
import {PaymentMethodEnum} from "@entities/enums";

export interface IItemCreatedEventPayload {
    itemId: number,
    price: number;
    quantity: number;
    paymentMethod: PaymentMethodEnum,
    options: {transaction: Transaction}
}