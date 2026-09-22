import app from "./app.js";
import { env } from "./config/env.js";
import { sequelize } from "./config/database.js";
import {
    connectRedis,
    disconnectRedis
} from "./config/redis.js";

import {
    connectRabbitMQ,
    disconnectRabbitMQ
} from "./config/rabbitmq.js";




const startServer = async () => {
    try {
        await sequelize.authenticate();

        console.log("Database connected");

        await connectRedis();

        await connectRabbitMQ();

        app.listen(env.port, () => {
            console.log(
                `Server running on port ${env.port}`
            );
        });
    } catch (error) {
        console.error(
            "Server startup failed:",
            error
        );

        process.exit(1);
    }
};

const gracefulShutdown = async (signal) => {
    console.log(`${signal} received`);

    try {
        await sequelize.close();

        await disconnectRedis();

        await disconnectRabbitMQ();

        console.log("Graceful shutdown completed");

        process.exit(0);
    } catch (error) {
        console.error(
            "Shutdown error:",
            error
        );

        process.exit(1);
    }
};

process.on(
    "SIGTERM",
    () => gracefulShutdown("SIGTERM")
);

process.on(
    "SIGINT",
    () => gracefulShutdown("SIGINT")
);

startServer();