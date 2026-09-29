import {
  getUsers,
  getUserById,
  createUser
} from "../../services/user.service.js";

import { getTasksByUserId } from "../../services/task.service.js";

const userResolvers = {
  Query: {
    users: async () => {
      return getUsers();
    },

    user: async (_, args) => {
      return getUserById(Number(args.id));
    }
  },

  Mutation: {
    createUser: async (_, args) => {
      return createUser(args.input.name);
    }
  },

  User: {
    tasks: async (parent) => {
      return getTasksByUserId(parent.id);
    }
  }
};

export default userResolvers;



// • 
// 	• s: Another relational resolver. If a client queries a user and wants to see everything they need to do, this intercepts the request, grabs the parent.id (the user's ID), and uses getTasksByUserId to pull all tasks assigned to that specific user.
