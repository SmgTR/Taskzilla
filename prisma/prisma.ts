import * as Prisma from '@prisma/client';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: Prisma.PrismaClient | undefined;
}

let prisma: Prisma.PrismaClient;
if (typeof window === 'undefined') {
  if (process.env.NODE_ENV === 'production') {
    prisma = new Prisma.PrismaClient();
  } else {
    if (!global.prisma) {
      global.prisma = new Prisma.PrismaClient();
    }

    prisma = global.prisma;
  }
}
export { prisma };
export default Prisma;
