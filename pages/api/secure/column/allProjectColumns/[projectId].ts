import { Column } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from 'prisma/prisma';

export const path = '/api/secure/column/allProjectColumns';

export interface ColumnResponse {
  Column: Column[];
}

export default async function getAllColumns(
  req: NextApiRequest,
  res: NextApiResponse<ColumnResponse[] | NextApiError>
) {
  const session = await getSession({ req });

  if (!session || !session.id) {
    return res.status(401).send({ error: 'You need to be authenticated to use this route' });
  }

  const { projectId } = req.query;

  if (!projectId) res.status(500).send({ error: 'Malformed request, please check provided data' });

  const userId = session.id as string;

  const allProjectColumns = await prisma.project.findMany({
    where: {
      id: projectId as string,
      OR: [
        {
          type: 'public'
        },
        {
          type: 'private',
          projectMember: {
            some: {
              memberId: userId
            }
          }
        }
      ]
    },
    select: {
      Column: {
        orderBy: {
          order: 'asc'
        },
        include: {
          Task: {
            orderBy: {
              order: 'asc'
            },
            include: {
              Attachment: true,
              ToDoList: true,
              Tag: true,
              Comment: true
            }
          }
        }
      }
    }
  });

  if (allProjectColumns.length === 0)
    return res.status(404).send({ error: 'Something went wrong please check provided data' });

  return res.status(201).send(allProjectColumns);
}
