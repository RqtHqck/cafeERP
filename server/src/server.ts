import app from "./app";
import logger from '@utils/logger'
import db from '@utils/sequelize.utility'
import {RoleService} from "@services/role.service";
import {AdminService} from "@services/admin.service";
import {ProductCategoryService} from "@services/productCategory.service";
import {OrderStatusService} from "@services/orderStatus.service";
import './events';

(async () => {
    try {
        // DB
        const roleService = new RoleService();
        const categoryService = new ProductCategoryService();
        const adminService = new AdminService();
        const orderStatusService = new OrderStatusService();

        await db.sequelize.authenticate({ logging: true });
        await db.sequelize.sync({ force: false, logging: true })
        logger.info("Database synchronized");

        await roleService.createMany();
        await categoryService.createMany();
        await adminService.createEmployeeAdmin();
        await orderStatusService.createMany();

        // SERVER
        app.listen(process.env.PORT, () => {
            logger.info(`Server started on http://localhost:${process.env.PORT}`);
        });
    } catch (error) {
        logger.error(error);
        process.exit(1);
    }
})();