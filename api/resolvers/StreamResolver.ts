import { Stream, StreamModel } from "../entity/Stream";
import { User, UserModel } from "../entity/User";
import { isAuth } from "../middleware/isAuth";
import { ObjectId } from "mongoose";
import { ObjectIdScalar } from "../schema/object-id.scalar";
import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { MyContext } from "../types/Mycontext";
import { StreamInput } from "../types/StreamInput";

@Resolver(() => Stream)
export class StreamResolver {
  @Query(() => Stream, { nullable: true })
  stream(@Arg("streamId", () => ObjectIdScalar) streamId: ObjectId) {
    //1. find a single stream
    // lean infos: https://jaykariesch.medium.com/mongoose-typescript-and-async-await-215faac39e24
    return StreamModel.findById(streamId).lean<Stream>(); // lean is use to return  directely pojo (so fast)
  }

  @Query(() => [Stream])
  @UseMiddleware(isAuth)
  streams(@Ctx() ctx: MyContext) {
    // 2. display all stream for the current user
    return StreamModel.find(<Stream>{
      author: ctx.res.locals.userId,
    }).lean<Stream>();
  }

  @Mutation(() => Stream)
  @UseMiddleware(isAuth)
  async addStream(
    @Arg("input") streamInput: StreamInput,
    @Ctx() ctx: MyContext,
  ): Promise<Stream> {
    //3. create a new user's stream
    const stream = new StreamModel({
      ...streamInput,
      author: ctx.res.locals.userId,
    } as Stream);

    await stream.save();
    return stream;
  }

  @Mutation(() => Stream)
  @UseMiddleware(isAuth)
  async editStream(
    @Arg("input") streamInput: StreamInput,
    @Ctx() ctx: MyContext,
  ): Promise<Stream> {
    const { id, title, description, url } = streamInput;
    const stream = await StreamModel.findOneAndUpdate(
      { _id: id, author: ctx.res.locals.userId },
      { title, description, url },
      { runValidators: true, new: true },
    );
    if (!stream) throw new Error("stream not found");
    return stream;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteStream(
    @Arg("streamId", () => ObjectIdScalar) streamId: ObjectId,
    @Ctx() ctx: MyContext,
  ): Promise<Boolean | undefined> {
    const deleted = await StreamModel.findByIdAndDelete({
      _id: streamId,
      author: ctx.res.locals.userId,
    });
    if (!deleted) throw new Error("stream not found");
    return true;
  }

  @FieldResolver(() => User)
  async author(@Root() stream: Stream): Promise<User | null> {
    return await UserModel.findById(stream.author);
  }
}
