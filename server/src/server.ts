import app from "./app";
import logger from '@utils/logger'
import db, {closeConnection, openConnection, syncDatabase} from '@utils/sequelize.utility'
import {RoleService} from "@services/role.service";
import {ProductCategoryService} from "@services/productCategory.service";
import {OrderStatusService} from "@services/orderStatus.service";
import {EmployeeService} from "@services/employee.service";

async function bootstrap()  {
    try {
        // DB
        const roleService = new RoleService();
        const categoryService = new ProductCategoryService();
        const employeeService = new EmployeeService();
        const orderStatusService = new OrderStatusService();
        await openConnection({ logging: true });
        await syncDatabase({ force: false, logging: true });
        await db.sequelize.authenticate();
        await db.sequelize.sync()
        logger.info("Database synchronized");

        await roleService.createMany();
        await categoryService.createMany();
        await employeeService.createEmployeeAdmin();
        await orderStatusService.createMany();

        // SERVER
        app.listen(process.env.PORT, () => {
            logger.info(`Server started on http://localhost:${process.env.PORT}`);
        });
    } catch (err) {
        logger.error(err);
        await closeConnection();
        process.exit(1);
    }
}

bootstrap();