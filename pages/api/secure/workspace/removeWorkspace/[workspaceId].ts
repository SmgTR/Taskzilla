import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from 'prisma/prisma';

type WorkspaceRemove = {
  message: string;
};

export default async function removeWorkspace(
  req: NextApiRequest,
  res: NextApiResponse<WorkspaceRemove | NextApiError>
) {
  const session = await getSession({ req });

  const { workspaceId } = req.query;

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

  const workspaceToDelete = await prisma.workspace.delete({
    where: {
      id: workspaceId as string
    }
  });

  if (!workspaceToDelete)
    return res
      .status(404)
      .send({ error: "Workspace probably do not exist or you don't have required permissions" });

  return res.status(200).send({ message: 'Workspace successfully deleted' });
}
