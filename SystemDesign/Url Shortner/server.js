import "dotenv/config";

import app from "./src/app.js";
import { sequelize } from "./src/config/db.js";

const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        await sequelize.authenticate();

        console.log("PostgreSQL connected");

        await sequelize.sync();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
}

startServer();