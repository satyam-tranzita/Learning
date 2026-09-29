import userResolvers from "./user.resolver.js";
import taskResolvers from "./task.resolver.js";

const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...taskResolvers.Query
  },

  Mutation: {
    ...userResolvers.Mutation,
    ...taskResolvers.Mutation
  },

  User: {
    ...userResolvers.User
  },

  Task: {
    ...taskResolvers.Task
  }
};

export default resolvers;





// Because Apollo needs one resolver object:
// {
//   Query: {...},
//   Mutation: {...},
//   User: {...},
//   Task: {...}
// }