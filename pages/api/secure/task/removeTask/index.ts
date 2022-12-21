import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from 'prisma/prisma';

export type TaskRequest = {
  projectId?: string;
  columnId: string;
  taskId: string;
};

type Task = {
  name: string;
};

export const path = '/api/secure/task/removeTask';

export default async function deleteTask(
  req: NextApiRequest,
  res: NextApiResponse<Task | NextApiError>
) {
  const session = await getSession({ req });

  const { projectId, taskId } = req.body as TaskRequest;

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

  const removeTask = await prisma.task.delete({
    where: {
      id: taskId
    }
  });

  if (!removeTask)
    return res.status(404).send({ error: 'Something went wrong please check provided data' });

  return res.status(201).send(removeTask);
}
