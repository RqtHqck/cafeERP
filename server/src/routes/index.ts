import { Router } from 'express';
import authRoutes from '@routes/auth.routes';
// import employeeRoutes from '@routes/employee.routes';
import adminRoutes from '@routes/admin.routes';


const router = Router();

router
    .use('/auth', authRoutes)
    // .use('/employee', employeeRoutes)
    .use('/admin', adminRoutes)

export default router;