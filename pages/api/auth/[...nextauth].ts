import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcrypt';

import { prisma } from 'prisma/prisma';

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'jsmith@doe.com' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // const user = { id: 1, name: 'J Smith', email: 'jsmith@example.com' };
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
  callbacks: {
    session({ session, token, user }) {
      return session;
    }
  }
});
