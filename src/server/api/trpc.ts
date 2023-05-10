/* eslint-disable import/first */

// API CONTEXTS
import { type CreateNextContextOptions } from '@trpc/server/adapters/next';
import { type Session } from 'next-auth';

import { getServerAuthSession } from '../auth';
import prisma from '../database';

type CreateContextOptions = {
  session: Session | null;
};

const createInnerTRPCContext = (options: CreateContextOptions) => {
  return {
    session: options.session,
    prisma
  };
};

export const createTRPCContext = async (options: CreateNextContextOptions) => {
  const { req, res } = options;

  const session = await getServerAuthSession({ req, res });

  return createInnerTRPCContext({ session });
};

// INITIALIZATION
import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson';
import { ZodError } from 'zod';

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        // eslint-disable-next-line unicorn/no-null
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null
      }
    };
  }
});

// ROUTER & PROCEDURE
export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

const enforceUserIsAuthenticated = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user }
    }
  });
});

export const protectedProcedure = t.procedure.use(enforceUserIsAuthenticated);
