import { j, publicProcedure, protectedProcedure } from "../jstack";
import { currentUser, auth } from "@clerk/nextjs/server";
import { userTable } from "../db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const userRouter = j.router({
  newUser: publicProcedure.mutation(async ({ c, ctx }) => {
    const { db } = ctx;

    const user = await currentUser();
    console.log("Current user:", user);

    if (!user) {
      throw new Error("User not found");
    }

    if (!user.primaryEmailAddress) {
      throw new Error("User does not have a primary email address");
    }

    const dbUser = await db
      .select()
      .from(userTable)
      .where(eq(userTable.clerkId, user.id));

    // console.log("Database user:", dbUser);

    if (dbUser.length === 0) {
      const newUser = await db.insert(userTable).values({
        clerkId: user.id,
        email: user.primaryEmailAddress.emailAddress,
        username: user.fullName || null,
        imageUrl: user.imageUrl || null,
      });
      // console.log("New user created:", newUser);

      return c.superjson(newUser);
    }

    return c.superjson(dbUser);
  }),

  completeUser: protectedProcedure
    .input(z.object({ username: z.string().min(1) }))
    .mutation(async ({ c, ctx }) => {
      const { db, user } = ctx;
    }),

  getDbUser: publicProcedure
    .input(z.object({ clerkId: z.string() }))
    .get(async ({ c, ctx, input }) => {
      const { db } = ctx;
      const { clerkId } = input;

      const dbUser = await db
        .select()
        .from(userTable)
        .where(eq(userTable.clerkId, clerkId));

      return c.superjson(dbUser[0]);
    }),
});
