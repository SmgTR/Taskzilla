import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from 'prisma/prisma';

export const path = '/api/secure/notifications/updateNotifications';

export default async function updateNotifications(
  req: NextApiRequest,
  res: NextApiResponse<Notification[] | NextApiMsg | NextApiError>
) {
  const session = await getSession({ req });

  if (!session || !session.id) {
    return res.status(401).send({ error: 'You need to be authenticated to use this route' });
  }

  const updateNotifications = await prisma.notification.updateMany({
    where: {
      userId: session.id,
      read: false
    },
    data: {
      read: true
    }
  });

  if (updateNotifications) {
    return res.status(200).send({ message: 'Notifications updated' });
  } else {
    return res.status(200).send({ message: 'Already up to date' });
  }
}
