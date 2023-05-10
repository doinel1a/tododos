import { testRouter } from './routes/test';
import { createTRPCRouter } from './trpc';

export const appRouter = createTRPCRouter({
  test: testRouter
});

export type AppRouter = typeof appRouter;
