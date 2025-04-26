import app from "./app";
import loggerUtility from '@utils/logger.utility'
import db from '@utils/sequelize.utility'


(async () => {
    try {
        // DB
        await db.sequelize.authenticate({ logging: true });
        db.sequelize.sync({ force: false, logging: true }).then(async () => {
            loggerUtility.info("Database synchronized");
        });
        // SERVER
        app.listen(process.env.PORT, () => {
            loggerUtility.info(`Server started on http://localhost:${process.env.PORT}`);
        });
    } catch (error) {
        loggerUtility.error(error);
    }
})();