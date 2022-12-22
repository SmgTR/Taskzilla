import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from 'prisma/prisma';
import { Invitation } from '@prisma/client';

export type NotificationsResponse = {
  id: string;
  userId: string;
  invitation: Invitation | null;
};

export const path = '/api/secure/notifications/getAllNotifications';

export default async function getAllNotifications(
  req: NextApiRequest,
  res: NextApiResponse<NotificationsResponse[] | NextApiError | []>
) {
  const session = await getSession({ req });

  if (!session || !session.id) {
    return res.status(401).send({ error: 'You need to be authenticated to use this route' });
  }
  const userNotifications = await prisma.notification.findMany({
    where: {
      userId: session.id
    },
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      invitation: {
        include: {
          user: {
            select: {
              name: true,
              lastName: true
            }
          },
          project: {
            select: {
              name: true
            }
          }
        }
      }
    }
  });

  return res.status(200).send(userNotifications);
}
