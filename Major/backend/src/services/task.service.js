import { Task } from "../models/index.js";
import redisClient from "../config/redis.js";

export const getTasksByUser = async (userId) => {
  const cacheKey = `tasks:user:${userId}`;

  // 1. Check Redis
  const cachedTasks = await redisClient.get(cacheKey);

  if (cachedTasks) {
    console.log("Cache HIT");

    return JSON.parse(cachedTasks);
  }

  console.log("Cache MISS");

  // 2. Query MySQL
  const tasks = await Task.findAll({
    where: {
      userId
    }
  });

  // 3. Store result in Redis
  await redisClient.set(
    cacheKey,
    JSON.stringify(tasks),
    {
      EX: 60
    }
  );

  return tasks;
};