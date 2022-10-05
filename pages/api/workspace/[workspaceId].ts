import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from 'prisma/prisma';

type Workspace = {
  name: string;
  owner: string;
  id: string;
};

export default async function getWorkspace(
  req: NextApiRequest,
  res: NextApiResponse<Workspace | { error: string }>
) {
  const session = await getSession({ req });

  const { workspaceId } = req.query;

  if (!session || !session.id) {
    return res.status(401).send({ error: 'You need to be authenticated to use this route' });
  }

  const workspace = await prisma.workspace.findFirst({
    where: {
      OR: [
        {
          id: workspaceId as string,
          type: 'private',
          workspaceMember: {
            some: {
              memberId: session.id
            }
          }
        },
        {
          id: workspaceId as string,
          type: 'public'
        }
      ]
    }
  });

  if (!workspace)
    return res
      .status(404)
      .send({ error: "Workspace probably do not exist or you don't have required permissions" });

  return res.status(200).send(workspace);
}
