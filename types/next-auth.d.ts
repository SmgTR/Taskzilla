import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    user: {
      password?: string;
      email?: string;
    };
  }
  interface Session {
    id: string | undefined;
    accessToken: string | unknown;
    user: {
      lastName: string;
      email: string;
      image: string;
      name: string;
    };
  }
}
