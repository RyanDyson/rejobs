import { roomTable } from "../db/schema";
import { z } from "zod";
import { j, publicProcedure } from "../jstack";

export const roomRouter = j.router({
  getAll: publicProcedure.query(async ({ c, ctx }) => {
    const { db } = ctx;

    const rooms = await db.select().from(roomTable);

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
