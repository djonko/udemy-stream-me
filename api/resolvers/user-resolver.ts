import { Resolver, Query, UseMiddleware, Arg, Ctx } from "type-graphql";
import { ObjectId } from "mongoose";
import { MyContext } from "@stream-me/api/types/my-context";
import { isAuth } from "@stream-me/api/middleware/is-auth";
import { User, UserModel } from "@stream-me/api/entity/user";
import { ObjectIdScalar } from "@stream-me/api/schema/object-id.scalar";

@Resolver(() => User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  async user(@Arg("userId", () => ObjectIdScalar) userId: ObjectId) {
    return await UserModel.findById(userId).lean<User>();
  }

  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  async currentUser(@Ctx() ctx: MyContext): Promise<User | null> {
    return await UserModel.findById(ctx.res.locals.userId).lean<User>();
  }
}
