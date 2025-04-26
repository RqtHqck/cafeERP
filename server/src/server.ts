import app from "./app";
import logger from '@utils/logger'
import db from '@utils/sequelize'


(async () => {
    try {
        // DB
        await db.sequelize.authenticate({ logging: true });
        db.sequelize.sync({ force: false, logging: true }).then(async () => {
            logger.info("Database synchronized");
        });
        // SERVER
        app.listen(process.env.PORT, () => {
            logger.info(`Server started on http://localhost:${process.env.PORT}`);
        });
    } catch (error) {
        logger.error(error);
    }
})();