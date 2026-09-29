import { ApolloServer } from "@apollo/server";

import typeDefs from "./schema/typeDefs.js";
import resolvers from "./resolvers/index.js";

const graphqlServer = new ApolloServer({
  typeDefs,
  resolvers
});

export default graphqlServer;



//appolo graphQl server