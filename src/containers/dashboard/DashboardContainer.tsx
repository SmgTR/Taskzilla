import {
  addNewNotification,
  setNotificationsData,
  setUnreadMessages,
  updateNotification,
  useNotificationsContext
} from '@/src/context/NotificationsContext';
import { useSession } from 'next-auth/react';
import { ReactNode, useEffect, FC } from 'react';
import { io, Socket } from 'socket.io-client';

import styles from './styles/DashboardContainer.module.scss';

interface WrapperProps {
  children: ReactNode;
}

let notificationsSocket: Socket;

const DashboardWrapper: FC<WrapperProps> = ({ children }) => {
  const { data: session } = useSession();
  const [_, dispatchNotifications] = useNotificationsContext();

  useEffect(() => {
    notificationsSocketInitializer();
  }, []);

  const notificationsSocketInitializer = async () => {
    await fetch('/api/socket');
    notificationsSocket = io('/notifications');

    notificationsSocket.on('connect', () => {
      notificationsSocket.emit('connect-notification', session?.user);
    });

    notificationsSocket.on('get-notification', (updatedNotifications) => {
      const numberOfNotifications = updatedNotifications.filter(
        (notification: NotificationData) => notification.read === false
      );
      dispatchNotifications(setUnreadMessages(numberOfNotifications.length));
      dispatchNotifications(setNotificationsData(updatedNotifications));
    });
  };

  return <div className={styles.container}>{children}</div>;
};

export default DashboardWrapper;
