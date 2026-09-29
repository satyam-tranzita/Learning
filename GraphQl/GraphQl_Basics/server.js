// ApolloServer is used to create our GraphQL server.-->create a server that understands graphQl server
import { ApolloServer } from "@apollo/server";
// Apollo gives us startStandaloneServer() so we can easily start the server without manually creating Express/HTTP configuration.
import { startStandaloneServer } from "@apollo/server/standalone";


const tasks = [
  {
    id: "1",
    title: "Learn GraphQL",
    completed: false
  },
  {
    id: "2",
    title: "Build GraphQL project",
    completed: false
  },
  {
    id: "3",
    title: "Prepare for interview",
    completed: true
  }
];



//graphQl Schema



// Type Definitions

// This defines the GraphQL schema.

// You can think of the schema as a contract between frontend and backend.

// It tells the client:

// "These are the things my API provides, and this is exactly how you can request them."

const typeDefs = `#graphql
 
  type Task {
    id: ID!
    title: String!
    completed: Boolean!
  }

  input CreateTaskInput {
    title: String!
    completed: Boolean
  }

  input UpdateTaskInput {
    title: String
    completed: Boolean
  }

  type Query {
    tasks: [Task!]!
    task(id: ID!): Task
  }

  type Mutation {
    createTask(input: CreateTaskInput!): Task!

    updateTask(
      id: ID!
      input: UpdateTaskInput!
    ): Task

    deleteTask(id: ID!): Task
  }
`;



// A resolver is basically the function that provides the actual data for a GraphQL field.
const resolvers = {
  Query: {
    tasks: () => tasks,

    task: (_, args) => {
      return tasks.find(task => task.id === args.id);
    }
  },

  Mutation: {
    createTask: (_, args) => {
      const newTask = {
        id: String(tasks.length + 1),
        title: args.input.title,
        completed: args.input.completed ?? false
      };

      tasks.push(newTask);

      return newTask;
    },

    updateTask: (_, args) => {
      const task = tasks.find(task => task.id === args.id);

      if (!task) {
        return null;
      }

      if (args.input.title !== undefined) {
        task.title = args.input.title;
      }

      if (args.input.completed !== undefined) {
        task.completed = args.input.completed;
      }

      return task;
    },

    deleteTask: (_, args) => {
      const index = tasks.findIndex(task => task.id === args.id);

      if (index === -1) {
        return null;
      }

      const deletedTask = tasks[index];

      tasks.splice(index, 1);

      return deletedTask;
    }
  }
};


//connect shema + resolver
const server = new ApolloServer({
  typeDefs,
  resolvers
});

// This starts Apollo Server on port:
const { url } = await startStandaloneServer(server, {
  listen: {
    port: 4000
  }
});

console.log(`Server running at ${url}`);




// import { ApolloServer } from "@apollo/server";
// import { startStandaloneServer } from "@apollo/server/standalone";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// const typeDefs = `#graphql

//   type Task {
//     id: ID!
//     title: String!
//     completed: Boolean!
//   }

//   input CreateTaskInput {
//     title: String!
//     completed: Boolean
//   }

//   input UpdateTaskInput {
//     title: String
//     completed: Boolean
//   }

//   type Query {
//     tasks: [Task!]!
//     task(id: ID!): Task
//   }

//   type Mutation {
//     createTask(input: CreateTaskInput!): Task!

//     updateTask(
//       id: ID!
//       input: UpdateTaskInput!
//     ): Task

//     deleteTask(id: ID!): Task
//   }
// `;

// const resolvers = {
//   Query: {
//     tasks: async () => {
//       return prisma.task.findMany();
//     },

//     task: async (_, args) => {
//       return prisma.task.findUnique({
//         where: {
//           id: Number(args.id)
//         }
//       });
//     }
//   },

//   Mutation: {
//     createTask: async (_, args) => {
//       return prisma.task.create({
//         data: {
//           title: args.input.title,
//           completed: args.input.completed ?? false
//         }
//       });
//     },

//     updateTask: async (_, args) => {
//       return prisma.task.update({
//         where: {
//           id: Number(args.id)
//         },
//         data: {
//           ...(args.input.title !== undefined && {
//             title: args.input.title
//           }),

//           ...(args.input.completed !== undefined && {
//             completed: args.input.completed
//           })
//         }
//       });
//     },

//     deleteTask: async (_, args) => {
//       return prisma.task.delete({
//         where: {
//           id: Number(args.id)
//         }
//       });
//     }
//   }
// };

// const server = new ApolloServer({
//   typeDefs,
//   resolvers
// });

// const { url } = await startStandaloneServer(server, {
//   listen: {
//     port: 4000
//   }
// });

// console.log(`Server running at ${url}`);