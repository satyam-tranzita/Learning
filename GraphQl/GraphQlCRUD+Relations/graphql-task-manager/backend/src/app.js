import { startStandaloneServer } from "@apollo/server/standalone";

import graphqlServer from "./graphql/index.js";

const startApp = async () => {
  const port = Number(process.env.PORT) || 4000;

  const { url } = await startStandaloneServer(
    graphqlServer,
    {
      listen: {
        port
      }
    }
  );

  console.log(`GraphQL Server running at ${url}`);
};

export default startApp;