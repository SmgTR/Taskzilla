import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from 'prisma/prisma';

type ProjectRemove = {
  message: string;
};

export default async function removeProject(
  req: NextApiRequest,
  res: NextApiResponse<ProjectRemove | NextApiError>
) {
  const session = await getSession({ req });

  const { projectId } = req.query;

  if (!session || !session.id) {
    return res.status(401).send({ error: 'You need to be authenticated to use this route' });
  }

  if (!projectId)
    res.status(401).send({ error: 'Something went wrong please check provided data' });

  const userProjectRole = await prisma.projectMember.findFirst({
    where: {
      memberId: session.id,
      projectId: projectId as string
    }
  });

  if (userProjectRole?.roleId !== 0)
    res
      .status(404)
      .send({ error: "Project probably do not exist or you don't have required permissions" });

  const projectDelete = await prisma.project.delete({
    where: {
      id: projectId as string
    }
  });

  if (!projectDelete)
    return res
      .status(404)
      .send({ error: "Project probably do not exist or you don't have required permissions" });

  return res.status(200).send({ message: 'Project successfully deleted' });
}
