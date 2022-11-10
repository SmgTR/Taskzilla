import { Tag } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from 'prisma/prisma';

export type UpdateTagRequest = {
  name: string;
  projectId: string;
  tagId: string;
};

export type UpdateTagResponse = {
  color: string;
  name: string;
};

export const path = '/api/secure/project/updateTag';

export default async function UpdateTag(
  req: NextApiRequest,
  res: NextApiResponse<UpdateTagResponse | NextApiError>
) {
  const session = await getSession({ req });

  const { name, projectId, tagId } = req.body as UpdateTagRequest;

  if (!session || !session.id) {
    return res.status(401).send({ error: 'You need to be authenticated to use this route' });
  }

  const userRole = await prisma.project.findUnique({
    where: {
      id: projectId
    },
    include: {
      projectMember: {
        where: {
          memberId: session.id,
          role: 'admin'
        }
      }
    }
  });

  if (!userRole)
    return res
      .status(401)
      .send({ error: "Workspace does not exist, or you don't have required permissions" });

  const tagUpdate = await prisma.tag.update({
    where: {
      id: tagId as string
    },
    data: {
      name
    }
  });

  if (!tagUpdate || !tagUpdate.name)
    return res.status(404).send({ error: 'Something went wrong please check provided data' });

  return res.status(201).send({ name: tagUpdate.name, color: tagUpdate.color });
}
