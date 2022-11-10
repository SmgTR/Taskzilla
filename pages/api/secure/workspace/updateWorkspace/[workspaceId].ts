import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from 'prisma/prisma';

type WorkspaceUpdateData = {
  workspaceUpdateData: {
    name?: string;
  };
};

export default async function removeWorkspace(
  req: NextApiRequest,
  res: NextApiResponse<WorkspaceUpdate | NextApiError>
) {
  const session = await getSession({ req });

  const { workspaceId } = req.query;

  const { workspaceUpdateData } = req.body as WorkspaceUpdateData;

  if (!session || !session.id) {
    return res.status(401).send({ error: 'You need to be authenticated to use this route' });
  }

  if (!workspaceId)
    res.status(401).send({ error: 'Something went wrong please check provided data' });

  const userWorkspaceRole = await prisma.workspaceMember.findFirst({
    where: {
      memberId: session.id,
      workspaceId: workspaceId as string
    }
  });

  if (userWorkspaceRole?.role !== 'admin')
    res
      .status(404)
      .send({ error: "Workspace probably do not exist or you don't have required permissions" });

  const workspaceUpdate = await prisma.workspace.update({
    where: {
      id: workspaceId as string
    },
    data: {
      ...workspaceUpdateData
    }
  });

  if (!workspaceUpdate)
    return res
      .status(404)
      .send({ error: "Workspace probably do not exist or you don't have required permissions" });

  return res.status(200).send(workspaceUpdate);
}
