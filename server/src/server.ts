import app from "./app";
import logger from '@utils/logger'
import db from '@utils/sequelize.utility'
import {RoleService} from "@services/role.service";
import {AdminService} from "@services/admin.service";
import {CategoryService} from "@services/category.service";


(async () => {
    try {
        // DB
        const roleService = new RoleService();
        const categoryService = new CategoryService();
        const adminService = new AdminService();

        await db.sequelize.authenticate({ logging: true });
        await db.sequelize.sync({ force: true, logging: true })
        logger.info("Database synchronized");

        await roleService.createMany();
        await categoryService.createMany();
        await adminService.createEmployeeAdmin();

        // SERVER
        app.listen(process.env.PORT, () => {
            logger.info(`Server started on http://localhost:${process.env.PORT}`);
        });
    } catch (error) {
        logger.error(error);
        process.exit(1);
    }
})();