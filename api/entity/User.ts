import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { ObjectId } from "mongoose";
import { Field, ObjectType } from "type-graphql";

@ObjectType({ description: "User" })
export class User {
  @Field({ complexity: 1 })
  readonly _id: ObjectId;

  @Field({ complexity: 1 })
  @Property({ required: true })
  email: string;

  @Property({ required: true })
  password: string;
}
export const UserModel = getModelForClass(User);
