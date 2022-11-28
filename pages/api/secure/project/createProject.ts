import { Tag } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from 'prisma/prisma';

export type ProjectRequest = {
  name: string;
  description?: string;
  type?: string;
  image: string;
  workspaceId: string;
};

export const path = '/api/secure/project/createProject';

export default async function createWorkspace(
  req: NextApiRequest,
  res: NextApiResponse<Project | NextApiError>
) {
  const session = await getSession({ req });

  const { name, description, type, image, workspaceId } = req.body as ProjectRequest;

  if (!session || !session.id) {
    return res.status(401).send({ error: 'You need to be authenticated to use this route' });
  }

  const userRole = await prisma.workspaceMember.findFirst({
    where: {
      workspaceId,
      memberId: session.id,
      role: 'admin'
    }
  });

  if (!userRole)
    return res
      .status(401)
      .send({ error: "Workspace does not exist, or you don't have required permissions" });

  const templateTags = await prisma.tagTemplate.findMany();

  const userId = session.id as string;

  const newProject = await prisma.project.create({
    data: {
      owner: userId,
      name,
      workspaceId,
      description,
      type: type ? type : 'public',
      image,
      projectMember: {
        create: [
          {
            roleId: 0,
            memberId: userId
          }
        ]
      },
      Tag: {
        createMany: {
          data: [
            {
              color: templateTags[0].color
            },
            {
              color: templateTags[1].color
            },
            {
              color: templateTags[2].color
            }
          ]
        }
      }
    }
  });

  if (!newProject)
    return res.status(404).send({ error: 'Something went wrong please check provided data' });

  return res.status(201).send(newProject);
}
