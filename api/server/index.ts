import { ApolloServer } from "apollo-server-express";
import express from "express";
import cors, { CorsOptions } from "cors";
import "reflect-metadata";
import "process";
import createSchema from "../schema";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import createSession from "../session";

const port = process.env.PORT || "8000";
async function createServer() {
  try {
    // 1. create a mongoose connection
    await createSession();
    // 2. create a express server
    const app = express();

    const corsOptions = {
      origin: "http://localhost:3000",
      credentials: true, // for cookies or authentication purpose
    } as CorsOptions;

    app.use(cors(corsOptions));
    // use json requests
    app.use(express.json());

    const schema = await createSchema();

    // 3. create graphQl server
    const apolloServer = new ApolloServer({
      schema,
      context: ({ req, res }) => ({ req, res }),
      introspection: true,
      //enable GraphQl playground
      plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground({
          // options
          settings: { "request.credentials": "include" },
        }),
      ],
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: corsOptions });

    // start the server
    app.listen({ port }, () => {
      console.log(
        `Server is running at http://localhost:${port}${apolloServer.graphqlPath}`,
      );
    });
  } catch (error) {
    console.log(error);
  }
}
createServer();
