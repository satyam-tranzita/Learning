import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} from "../../services/task.service.js";

import { getUserById } from "../../services/user.service.js";

const taskResolvers = {
  Query: {
    tasks: async () => {
      return getTasks();
    },

    task: async (_, args) => {
      return getTaskById(Number(args.id));
    }
  },

  Mutation: {
    createTask: async (_, args) => {
      return createTask({
        title: args.input.title,
        completed: args.input.completed,
        userId: Number(args.input.userId)
      });
    },

    updateTask: async (_, args) => {
      const data = {};

      if (args.input.title !== undefined) {
        data.title = args.input.title;
      }

      if (args.input.completed !== undefined) {
        data.completed = args.input.completed;
      }

      try {
        return await updateTask(
          Number(args.id),
          data
        );
      } catch (error) {
        return null;
      }
    },

    deleteTask: async (_, args) => {
      try {
        return await deleteTask(Number(args.id));
      } catch (error) {
        return null;
      }
    }
  },


  //this is field relational resolver --> 
// 
// 	• This handles data relationships. If a client queries a task and requests its author/user details, this resolver automatically snatches the userId from the parent task and fetches the corresponding user profile.


  Task: {
    user: async (parent) => {
      return getUserById(parent.userId);
    }
  }
};

export default taskResolvers;