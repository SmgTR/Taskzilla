import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    user: {
      password?: string;
      email?: string;
    };
  }
}
