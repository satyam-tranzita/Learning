// //index.js for variables:
// import { ApolloServer } from "@apollo/server";
// import { startStandaloneServer } from "@apollo/server/standalone";

// const tasks = [
//   {
//     id: "1",
//     title: "Learn GraphQL",
//     completed: false
//   },
//   {
//     id: "2",
//     title: "Build GraphQL project",
//     completed: false
//   },
//   {
//     id: "3",
//     title: "Prepare for interview",
//     completed: true
//   }
// ];


// //schema
// const typeDefs = `#graphql
//   type Task {
//     id: ID!
//     title: String!
//     completed: Boolean!
//   }

//   type Query {
//     tasks: [Task!]!
//     task(id: ID!): Task
//   }
// `;


// //resolver
// const resolvers = {
//     //read
//   Query: {
//     tasks: () => tasks,

//     task: (_, args) => {
//       return tasks.find(task => task.id === args.id);
//     }
//   },


// };

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   csrfPrevention: false
// });

// const { url } = await startStandaloneServer(server, {
//   listen: {
//     port: 4000
//   }
// });

// console.log(`Server running at ${url}`);







import { ApolloServer } from "@apollo/server";
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


//schema

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

  type Query {
    tasks: [Task!]!
    task(id: ID!): Task
  }

  type Mutation {
    createTask(input: CreateTaskInput!): Task!
  }
`;



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
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const { url } = await startStandaloneServer(server, {
  listen: {
    port: 4000
  }
});

console.log(`Server running at ${url}`);