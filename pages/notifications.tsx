import { NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from 'prisma/prisma';

import Dashboard from '@/src/layouts/Dashboard';

import NotificationsContainer from '@/src/containers/dashboard/NotificationsContainer';
import { useEffect } from 'react';
import { updateNotifications } from '@/src/network/secure/notifications/updateNotification';

interface Props {
  notifications: NotificationData[];
  loggedIn: any;
}

const Notifications: NextPage<Props> = () => {
  useEffect(() => {
    updateNotifications();
  }, []);

  return (
    <Dashboard>
      <NotificationsContainer />
    </Dashboard>
  );
};

export default Notifications;
