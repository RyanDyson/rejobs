import { roomSessionTable, applicationsTable } from "../db/schema";
import { z } from "zod";
import { j, publicProcedure } from "../jstack";
import { eq, count, desc } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";

export const dashboardRouter = j.router({
  getStats: publicProcedure
    .input(
      z.object({
        userId: z.number(),
        clerkId: z.string(),
      })
    )
    .query(async ({ input, c, ctx }) => {
      const { userId, clerkId } = input;
      const { db } = ctx;
      const user = await currentUser();
      if (!user || user.id !== clerkId) {
        throw new Error("Unauthorized - User ID does not match Clerk ID");
      }

      const totalApplications = await db
        .select({ count: count(applicationsTable.id) })
        .from(applicationsTable)
        .where(eq(applicationsTable.userId, userId));

      const totalSessions = await db
        .select({ count: count(roomSessionTable.id) })
        .from(roomSessionTable)
        .where(eq(roomSessionTable.userId, userId));

      const totalRooms = await db
        .select({ count: count(roomSessionTable.id) })
        .from(roomSessionTable)
        .where(eq(roomSessionTable.userId, userId));

      return c.superjson({
        totalSessions: totalSessions[0]?.count || 0,
        totalRooms: totalRooms[0]?.count || 0,
        totalApplications: totalApplications[0]?.count || 0,
      });
    }),
  getRecentActivity: publicProcedure
    .input(
      z.object({
        userId: z.number(),
        clerkId: z.string(),
      })
    )
    .query(async ({ input, c, ctx }) => {
      const { userId, clerkId } = input;
      const { db } = ctx;
      const user = await currentUser();
      if (!user || user.id !== clerkId) {
        throw new Error("Unauthorized - User ID does not match Clerk ID");
      }

      const recentSessions = await db
        .select()
        .from(roomSessionTable)
        .where(eq(roomSessionTable.userId, userId))
        .orderBy(desc(roomSessionTable.createdAt))
        .limit(5);

      const recentApplications = await db
        .select()
        .from(applicationsTable)
        .where(eq(applicationsTable.userId, userId))
        .orderBy(desc(applicationsTable.updatedAt))
        .limit(5);

      return c.superjson({
        recentSessions,
        recentApplications,
      });
    }),
});
