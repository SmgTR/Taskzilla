import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from 'prisma/prisma';

type ProjectRequest = {
  name: string;
  projectId: string;
};

type Column = {
  name: string;
};

export default async function createColumn(
  req: NextApiRequest,
  res: NextApiResponse<Column | NextApiError>
) {
  const session = await getSession({ req });

  const { name, projectId } = req.body as ProjectRequest;

  if (!session || !session.id) {
    return res.status(401).send({ error: 'You need to be authenticated to use this route' });
  }

  const userId = session.id as string;

  const projectMember = await prisma.project.findUnique({
    where: {
      id: projectId
    },
    include: {
      projectMember: {
        where: {
          memberId: userId
        }
      }
    }
  });

  if (!projectMember)
    return res
      .status(401)
      .send({ error: "Workspace does not exist, or you don't have required permissions" });

  const newColumn = await prisma.column.create({
    data: {
      name,
      projectId
    }
  });

  if (!newColumn)
    return res.status(404).send({ error: 'Something went wrong please check provided data' });

  return res.status(201).send(newColumn);
}
