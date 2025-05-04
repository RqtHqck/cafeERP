import { Router } from 'express';
import authRoutes from '@routes/auth.routes';
import employeesRoutes from "@routes/employees.routes";
import itemsRoutes from "@routes/items.routes";
import productRoutes from "@routes/products.routes";

const router = Router();

router
    .use('/auth', authRoutes)
    .use('/employees', employeesRoutes)
    .use('/items', itemsRoutes)
    .use('/products', productRoutes)

export default router;