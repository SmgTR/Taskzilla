import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from 'prisma/prisma';

type Project = {
  name: string;
};

export default async function getAllProjects(
  req: NextApiRequest,
  res: NextApiResponse<Project[] | NextApiError>
) {
  const session = await getSession({ req });

  if (!session || !session.id) {
    return res.status(401).send({ error: 'You need to be authenticated to use this route' });
  }

  const userId = session.id as string;

  const allUserProjects = await prisma.project.findMany({
    where: {
      projectMember: {
        some: {
          memberId: userId
        }
      }
    }
  });
  if (!allUserProjects)
    return res.status(404).send({ error: 'Something went wrong please check provided data' });

  return res.status(201).send(allUserProjects);
}
