import { NextPage } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { prisma } from 'prisma/prisma';

import Dashboard from '@/src/layouts/Dashboard';

import NotificationsContainer from '@/src/containers/dashboard/NotificationsContainer';

interface Props {
  notifications: NotificationData[];
  loggedIn: any;
}

const Notifications: NextPage<Props> = ({ notifications }) => {
  return (
    <Dashboard>
      <NotificationsContainer notifications={notifications} />
    </Dashboard>
  );
};

export default Notifications;

export async function getServerSideProps(ctx: any) {
  const session = await getSession(ctx);

  if (session && session.id) {
    const userId = session.id as string;

    const userNotifications = await prisma.notification.findMany({
      where: {
        userId: userId
      },
      include: {
        invitation: true
      }
    });

    if (userNotifications) {
      return {
        props: { loggedIn: session, notifications: JSON.parse(JSON.stringify(userNotifications)) }
      };
    }
  } else {
    return {
      redirect: {
        destination: '/',
        permanent: true
      }
    };
  }
}
