import { ProjectMember } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from 'prisma/prisma';

export type ProjectResponse = Project & { projectMember: ProjectMember[] };

export const path = '/api/secure/project/getProject';

export default async function getProject(
  req: NextApiRequest,
  res: NextApiResponse<ProjectResponse | { error: string }>
) {
  const session = await getSession({ req });

  if (!session || !session.id) {
    return res.status(401).send({ error: 'You need to be authenticated to use this route' });
  }
  const { projectId } = req.query;

  const project = await prisma.project.findFirst({
    where: {
      OR: [
        {
          id: projectId as string,
          type: 'private',
          projectMember: {
            some: {
              memberId: session.id
            }
          }
        },
        {
          id: projectId as string,
          type: 'public',
          workspace: {
            workspaceMember: {
              some: {
                memberId: session.id
              }
            }
          }
        },
        {
          id: projectId as string,
          type: 'public',
          workspace: {
            type: 'public'
          }
        }
      ]
    },
    include: {
      projectMember: true,
      Column: true
    }
  });

  if (!project)
    return res
      .status(404)
      .send({ error: "Project probably do not exist or you don't have required permissions" });

  return res.status(200).send(project);
}
