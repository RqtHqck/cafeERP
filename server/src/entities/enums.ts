export enum RoleEnum {
    ADMIN='admin',
    CLEANER = "cleaner",
    COOK = "cook",
    CASHIER = "cashier",
    MANAGER = "manager",
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