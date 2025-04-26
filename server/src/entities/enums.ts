export enum RoleEnum {
    ADMIN='admin',
    CLEANER = "cleaner",
    COOK = "Повар",
    CASHIER = "Кассир",
    MANAGER = "Менеджер",
}

export enum StatusEnum {
    PENDING='pending',
    PROCESSING='processing',
    DONE='done',
    ABORTED='aborted'
}

export default {
    RoleEnum,
    StatusEnum
};