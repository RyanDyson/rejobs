import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { env } from "hono/adapter";
import { jstack } from "jstack";
import { currentUser } from "@clerk/nextjs/server";
import { HTTPException } from "hono/http-exception";

interface Env {
  Bindings: { DATABASE_URL: string };
}

export const j = jstack.init<Env>();

/**
 * Type-safely injects database into all procedures
 *
 * @see https://jstack.app/docs/backend/middleware
 */
const databaseMiddleware = j.middleware(async ({ c, next }) => {
  const { DATABASE_URL } = env(c);

  const sql = neon(DATABASE_URL);
  const db = drizzle(sql);

  return await next({ db });
});

/**
 * Authentication middleware with route protection
 * Protects dashboard routes and validates user authentication
 */
const authMiddleware = j.middleware(async ({ c, next }) => {
  //auth middleware broken, currentUser() is called before clerk middleware is init
  const user = await currentUser();

  // Check if the current route is a protected route (dashboard)
  const url = new URL(c.req.url);
  const isProtectedRoute = url.pathname.startsWith("/dashboard");

  // If it's a protected route and user is not authenticated, throw error
  if (isProtectedRoute && !user) {
    throw new HTTPException(401, { message: "Unauthorized - Please sign in" });
  }

  return await next({ user: { clerkId: user?.id } });
});

/**
 * Public (unauthenticated) procedures
 *
 * This is the base piece you use to build new queries and mutations on your API.
 */
export const publicProcedure = j.procedure.use(databaseMiddleware);
export const protectedProcedure = publicProcedure.use(authMiddleware);

/**
 * Middleware configuration for Next.js
 * This replaces the need for a separate middleware.ts file
 */
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
