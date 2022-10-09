import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from 'prisma/prisma';

type ProjectRequest = {
  name: string;
  description?: string;
  type?: string;
  image: string;
  workspaceId: string;
};

export default async function createWorkspace(
  req: NextApiRequest,
  res: NextApiResponse<Project | NextApiError>
) {
  const session = await getSession({ req });

  const { name, description, type, image, workspaceId } = req.body as ProjectRequest;

  if (!session || !session.id) {
    return res.status(401).send({ error: 'You need to be authenticated to use this route' });
  }

  const userId = session.id as string;

  const newProject = await prisma.project.create({
    data: {
      owner: userId,
      name,
      workspaceId,
      image,
      projectMember: {
        create: [
          {
            role: 'admin',
            memberId: userId
          }
        ]
      }
    }
  });

  if (!newProject)
    return res.status(404).send({ error: 'Something went wrong please check provided data' });

  return res.status(201).send(newProject);
}
