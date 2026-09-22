import { createClient } from "redis";
import { env } from "./env.js";

export const redisClient = createClient({
    url: env.redis.url
});

redisClient.on("error", (error) => {
    console.error("Redis Client Error:", error);
});

export const connectRedis = async () => {
    if (redisClient.isOpen) {
        return;
    }

    await redisClient.connect();

    console.log("Redis connected");
};

export const disconnectRedis = async () => {
    if (!redisClient.isOpen) {
        return;
    }

    await redisClient.quit();

    console.log("Redis disconnected");
};