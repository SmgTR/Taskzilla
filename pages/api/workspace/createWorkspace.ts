import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from 'prisma/prisma';

type Workspace = {
  name: string;
};

export default async function createWorkspace(
  req: NextApiRequest,
  res: NextApiResponse<Workspace | { error: string }>
) {
  const session = await getSession({ req });
  if (!session || !session.user)
    res.status(401).send({ error: 'You need to be authenticated to use this route' });
  console.log(session);
  // const data = await prisma.workspace.create({

  // });

  //   console.log(data);

  return { name: 'dada' };
}
