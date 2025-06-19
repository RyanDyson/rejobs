import { roomTable } from "../db/schema";
import { z } from "zod";
import { j, publicProcedure } from "../jstack";
import { get } from "http";

export const roomRouter = j.router({
  getAll: publicProcedure.query(async ({ c, ctx }) => {
    const { db } = ctx;

    const rooms = await db.select().from(roomTable);

    return c.superjson(rooms);
  }),

  create: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1),
        description: z.string(),
        prompt: z.string(),
      })
    )
    .mutation(async ({ ctx, c, input }) => {
      const { id, name, description, prompt } = input;
      const { db } = ctx;

      const room = await db
        .insert(roomTable)
        .values({ id, name, description, prompt });

      return c.superjson(room);
    }),
});
