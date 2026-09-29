import prisma from "../config/prisma.js";

export const getUsers = async () => {
  return prisma.user.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });
};

export const getUserById = async (id) => {
  return prisma.user.findUnique({
    where: {
      id
    }
  });
};

export const createUser = async (name) => {
  return prisma.user.create({
    data: {
      name
    }
  });
};