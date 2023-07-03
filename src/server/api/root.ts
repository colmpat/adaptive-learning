import { exampleRouter } from "~/server/api/routers/example";
import { createTRPCRouter } from "~/server/api/trpc";
import { learningStateRouter } from "./routers/learningState";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  learningState: learningStateRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
