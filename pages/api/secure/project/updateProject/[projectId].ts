import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from 'prisma/prisma';

type ProjectUpdateData = {
  projectUpdateData: {
    name?: string;
    type?: string;
    description?: string;
    image?: string;
  };
};

export default async function removeWorkspace(
  req: NextApiRequest,
  res: NextApiResponse<Project | NextApiError>
) {
  const session = await getSession({ req });

  const { projectId } = req.query;

  const { projectUpdateData } = req.body as ProjectUpdateData;

  if (!session || !session.id) {
    return res.status(401).send({ error: 'You need to be authenticated to use this route' });
  }

  if (!projectId)
    res.status(401).send({ error: 'Something went wrong please check provided data' });

  const userWorkspaceRole = await prisma.projectMember.findFirst({
    where: {
      memberId: session.id,
      projectId: projectId as string
    }
  });

  if (userWorkspaceRole?.roleId !== 0)
    res
      .status(404)
      .send({ error: "Workspace probably do not exist or you don't have required permissions" });

  const projectUpdate = await prisma.project.update({
    where: {
      id: projectId as string
    },
    data: {
      ...projectUpdateData
    }
  });

  if (!projectUpdate)
    return res
      .status(404)
      .send({ error: "Workspace probably do not exist or you don't have required permissions" });

  return res.status(200).send(projectUpdate);
}
