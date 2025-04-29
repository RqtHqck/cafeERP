export enum RoleEnum {
    ADMIN='admin',
    CLEANER = "cleaner",
    COOK = "cook",
    CASHIER = "cashier",
    MANAGER = "manager",
}

export enum OrderStatusEnum {
    PENDING='pending',
    PROCESSING='processing',
    DONE='done',
    ABORTED='aborted'
}

export enum CategoryEnum {
    COFFEE = 'coffee',
    TEA = 'tea',
    COLD_DRINKS = 'cold_drinks',
    PASTRY = 'pastry',
    DESSERTS = 'desserts',
    SANDWICHES = 'sandwiches',
    SALADS = 'salads',
    BREAKFAST = 'breakfast',
    LUNCH = 'lunch'
}


export enum ItemUnitEnum {
    GRAMS = 'grams',
    KILOGRAMS = 'kilograms',
    MILLILITRES = 'millilitres',
    PIECES = 'pieces',
}


export default {
    RoleEnum,
    OrderStatusEnum
};