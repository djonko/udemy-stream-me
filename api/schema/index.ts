import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import { ObjectId } from "mongodb";
import path from "path";
import { UserResolver } from "../resolvers/UserResolver";
import { AuthResolver } from "../resolvers/AuthResolver";
import { StreamResolver } from "../resolvers/StreamResolver";
import { TypegooseMiddleware } from "../middleware/typegoose";
import { ObjectIdScalar } from "./object-id.scalar";

//build TypeGraphQl executable schema

export default async function createSchema(): Promise<GraphQLSchema> {
  const schema = buildSchema({
    //1. add all typescript resolvers
    resolvers: [UserResolver, AuthResolver, StreamResolver],
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
    //2. use conventing middleware
    globalMiddlewares: [TypegooseMiddleware],
    //3. use objectId scalar mapping
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
    validate: false,
  });
  return schema;
}
