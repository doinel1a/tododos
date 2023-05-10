import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';

export const testRouter = createTRPCRouter({
  getPublicTest: publicProcedure.query(() => {
    return 'Public Test!';
  }),
  getAuthenticatedTest: protectedProcedure.query(() => {
    return 'Authenticated Test!';
  })
});
