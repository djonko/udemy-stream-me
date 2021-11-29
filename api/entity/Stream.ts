import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { ObjectId } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";
import { User } from "entity/user";
import { Ref } from "types/ref";

@ObjectType({ description: " Stream embedded post content " })
export class Stream {
  @Field(() => ID)
  readonly _id: ObjectId;

  @Field()
  @Property({ required: true })
  title: string;

  @Field()
  @Property({ required: true })
  description: string;

  @Field()
  @Property({ required: true })
  url: string;

  @Field(() => User)
  @Property({ ref: User, required: true })
  author: Ref<User>;
}

export const StreamModel = getModelForClass(Stream);
