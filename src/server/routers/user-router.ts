import { j, publicProcedure } from "../jstack";
import { currentUser, auth } from "@clerk/nextjs/server";
import { userTable } from "../db/schema";
import { eq } from "drizzle-orm";

export const userRouter = j.router({
  newUser: publicProcedure.mutation(async ({ c, ctx }) => {
    const { db } = ctx;
    const { userId: clerkId } = await auth();

    if (!clerkId) {
      throw new Error("User not authenticated");
    }

    const user = await currentUser();
    if (!user) {
      throw new Error("User not found");
    }

    if (!user.primaryEmailAddress) {
      throw new Error("User does not have a primary email address");
    }

    const dbUser = await db
      .select()
      .from(userTable)
      .where(eq(userTable.clerkId, clerkId));

    if (!dbUser) {
      const newUser = await db.insert(userTable).values({
        clerkId,
        email: user.primaryEmailAddress.emailAddress,
        username: user.username || null,
        imageUrl: user.imageUrl || null,
      });

      return c.superjson(newUser);
    }

    return c.superjson(dbUser);
  }),
  getUser: publicProcedure.query(async ({ c, ctx }) => {
    const { db } = ctx;
    const { userId: clerkId } = await auth();

    if (!clerkId) {
      throw new Error("User not authenticated");
    }

    const user = await db
      .select()
      .from(userTable)
      .where(eq(userTable.clerkId, clerkId));

    return c.superjson(user);
  }),
});
