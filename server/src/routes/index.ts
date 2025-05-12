import { Router } from 'express';
import authRoutes from '@routes/auth.routes';
import employeeRoutes from "@routes/employees.routes";
import itemRoutes from "@routes/items.routes";
import productRoutes from "@routes/products.routes";
import expenseRoutes from "@routes/expenses.routes";
import orderRoutes from "@routes/orders.routes";

const router = Router();

router
    .use('/auth', authRoutes)
    .use('/employees', employeeRoutes)
    .use('/items', itemRoutes)
    .use('/products', productRoutes)
    .use('/orders', orderRoutes )
    .use('/expenses', expenseRoutes)

export default router;