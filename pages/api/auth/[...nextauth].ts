import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcrypt';

import { prisma } from 'prisma/prisma';

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/auth/signIn',
    newUser: '/auth/signUp'
  },
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'jsmith@doe.com' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials): Promise<any> {
        if (!credentials?.email || !credentials.password) throw new Error();

        const user = await prisma.user.findUnique({ where: { email: credentials.email } });

        const match = user?.password
          ? await bcrypt.compare(credentials.password, user.password)
          : false;
        if (user && match) {
          return user;
        } else {
          return null;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET!,
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      const user = await prisma.user.findUnique({ where: { email: session.user?.email ?? '' } });
      session.user.lastName = user?.lastName ?? '';
      session.id = token.sub;
      session.accessToken = token.accessToken;
      return session;
    }
  }
});
