import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { GetServerSidePropsContext } from 'next';
import { getServerSession, NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { env } from '@/env.mjs';

import prisma from './database';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }
    })
  ]
};

export const getServerAuthSession = (context: {
  req: GetServerSidePropsContext['req'];
  res: GetServerSidePropsContext['res'];
}) => {
  return getServerSession(context.req, context.res, authOptions);
};
