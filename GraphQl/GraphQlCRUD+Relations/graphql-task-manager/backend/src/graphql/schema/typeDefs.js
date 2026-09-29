// graphQL schema--> thus is a api contract

const typeDefs = `#graphql

  type User {
    id: ID!
    name: String!
    tasks: [Task!]!
  }

  type Task {
    id: ID!
    title: String!
    completed: Boolean!
    user: User!
  }

  input CreateUserInput {
    name: String!
  }

  input CreateTaskInput {
    title: String!
    completed: Boolean
    userId: ID!
  }

  type Query {
    users: [User!]!
    tasks: [Task!]!
    task(id: ID!): Task
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    createTask(input: CreateTaskInput!): Task!
    updateTask(id: ID!, input: UpdateTaskInput!): Task
    deleteTask(id: ID!): Task
  }
`;

export default typeDefs;