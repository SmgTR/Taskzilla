import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from 'prisma/prisma';

export type TaskRequest = {
  name: string;
  projectId: string;
  columnId: string;
  taskId: string;
  description?: string;
};

type Task = {
  name: string;
};

export const path = '/api/secure/task/updateTask';

export default async function updateTask(
  req: NextApiRequest,
  res: NextApiResponse<Task | NextApiError>
) {
  const session = await getSession({ req });

  const { name, projectId, taskId, description } = req.body as TaskRequest;

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

  const updateTask = await prisma.task.update({
    where: {
      id: taskId
    },
    data: {
      name,
      description
    }
  });

  if (!updateTask)
    return res.status(404).send({ error: 'Something went wrong please check provided data' });

  return res.status(201).send(updateTask);
}
