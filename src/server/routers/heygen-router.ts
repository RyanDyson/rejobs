import { j, publicProcedure } from "../jstack";

const HEYGEN_API_KEY = process.env.HEYGEN_API_KEY;

type HeyGenResponse = {
  data: {
    token: string;
  };
};

export const heygenRouter = j.router({
  createToken: publicProcedure.mutation(async ({ c }) => {
    try {
      if (!HEYGEN_API_KEY) {
        throw new Error("HeyGen API key is missing");
      }

      const baseAPIURL = process.env.NEXT_PUBLIC_BASE_API_URL;
      if (!baseAPIURL) {
        throw new Error("Base API URL is not defined");
      }

      const res = await fetch(`${baseAPIURL}/v1/streaming.create_token`, {
        method: "POST",
        headers: {
          "x-api-key": HEYGEN_API_KEY,
        },
      });

      if (!res.ok) {
        throw new Error(`HeyGen API error: ${res.status} ${res.statusText}`);
      }

      const data = (await res.json()) as HeyGenResponse;

      return c.superjson({
        token: data.data.token,
        success: true,
      });
    } catch (error) {
      console.error("Error fetching access token:", error);

      throw new Error(
        error instanceof Error
          ? error.message
          : "Failed to retrieve access token"
      );
    }
  }),

  // // Optional: Add a health check procedure
  // healthCheck: publicProcedure.query(async ({ c }) => {
  //   const hasApiKey = !!HEYGEN_API_KEY;
  //   const hasBaseURL = !!process.env.NEXT_PUBLIC_BASE_API_URL;

  //   return c.superjson({
  //     status: "ok",
  //     config: {
  //       hasApiKey,
  //       hasBaseURL,
  //     },
  //   });
  // }),
});
