import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from 'prisma/prisma';

export type Workspace = {
  name: string;
};

export const path = '/api/secure/workspace/createWorkspace';

export default async function createWorkspace(
  req: NextApiRequest,
  res: NextApiResponse<Workspace | { error: string }>
) {
  const session = await getSession({ req });

  const { name } = req.body;

  if (!session || !session.id) {
    return res.status(401).send({ error: 'You need to be authenticated to use this route' });
  }

  const userId = session.id as string;

  const newWorkspace = await prisma.workspace.create({
    data: {
      owner: userId,
      name,
      workspaceMember: {
        create: [
          {
            role: 'admin',
            memberId: userId
          }
        ]
      }
    },
    include: {
      workspaceMember: true
    }
  });

  res.status(201).send(newWorkspace);

  return newWorkspace;
}
