import { roomTable } from "../db/schema";
import { z } from "zod";
import { j, publicProcedure } from "../jstack";
import { eq } from "drizzle-orm";

export const roomRouter = j.router({
  getAllByUserId: publicProcedure
    .input(z.object({ userId: z.number() }))
    .query(async ({ input, c, ctx }) => {
      const { userId } = input;
      const { db } = ctx;

      const rooms = await db
        .select()
        .from(roomTable)
        .where(eq(roomTable.userId, userId));

      return c.superjson(rooms);
    }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        prompt: z.string(),
        userId: z.number(),
        jobId: z.number(),
      })
    )
    .mutation(async ({ ctx, c, input }) => {
      const { name, description, prompt, userId, jobId } = input;
      const { db } = ctx;

      const room = await db.insert(roomTable).values({
        name,
        description,
        prompt,
        userId,
        jobId,
      });

      return c.superjson(room);
    }),
});
