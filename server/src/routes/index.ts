import { Router } from 'express';
import authRoutes from '@routes/auth.routes';
import employeesRoutes from "@routes/employees.routes";
import itemsRoutes from "@routes/items.routes";


const router = Router();

router
    .use('/auth', authRoutes)
    .use('/employees', employeesRoutes)
    .use('/items', itemsRoutes)

export default router;