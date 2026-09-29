import prisma from "../config/prisma.js";

export const getTasks = async () => {
  return prisma.task.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });
};

export const getTaskById = async (id) => {
  return prisma.task.findUnique({
    where: {
      id
    }
  });
};

export const createTask = async ({
  title,
  completed,
  userId
}) => {
  return prisma.task.create({
    data: {
      title,
      completed: completed ?? false,
      userId
    }
  });
};

export const updateTask = async (id, data) => {
  return prisma.task.update({
    where: {
      id
    },
    data
  });
};

export const deleteTask = async (id) => {
  return prisma.task.delete({
    where: {
      id
    }
  });
};

export const getTasksByUserId = async (userId) => {
  return prisma.task.findMany({
    where: {
      userId
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};