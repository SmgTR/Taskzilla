import { NextPage } from 'next';

import styles from './styles/NotificationsContainer.module.scss';

interface Props {
  notifications: NotificationData[];
}

const NotificationsContainer: NextPage<Props> = ({ notifications }) => {
  return (
    <div>
      <h4 className={styles.notificationsTitle}>Your notifications:</h4>
      <ul>
        {notifications.map((notification) => {
          return <li key={notification.id}>{notification.id}</li>;
        })}
      </ul>
    </div>
  );
};

export default NotificationsContainer;
