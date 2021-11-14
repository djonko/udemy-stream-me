import { InputType, Field } from "type-graphql";
import { ObjectId } from "mongoose";
import { Stream } from "entity/Stream";

@InputType()
export class StreamInput implements Partial<Stream> {
  @Field({ nullable: true })
  id?: ObjectId;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  url: string;
}
