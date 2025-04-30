import { Router } from 'express';
import authRoutes from '@routes/auth.routes';
import employeeRoutes from "@routes/employee.routes";


const router = Router();

router
    .use('/auth', authRoutes)
    .use('/employee', employeeRoutes)

export default router;