import NotificationItem from '@/src/components/dashboard/notification/NotificationItem';
import { setUnreadMessages, useNotificationsContext } from '@/src/context/NotificationsContext';
import { FC, useEffect } from 'react';

import styles from './styles/NotificationsContainer.module.scss';

const NotificationsContainer: FC = () => {
  const [notificationsState, notificationsDispatch] = useNotificationsContext();

  useEffect(() => {
    setTimeout(() => {
      return notificationsDispatch(setUnreadMessages(0));
    }, 2000);
  }, [notificationsState, notificationsDispatch]);

  return (
    <div className={styles.notificationContainer}>
      <h4 className={styles.notificationsTitle}>Your notifications:</h4>
      <ul className={styles.notificationsContent}>
        {notificationsState.notifications.map((notification) => {
          return <NotificationItem key={notification.id} notification={notification} />;
        })}
      </ul>
    </div>
  );
};

export default NotificationsContainer;
