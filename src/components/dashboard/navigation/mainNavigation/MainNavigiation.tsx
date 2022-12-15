import { NextPage } from 'next';

import { faBell, faGear, faHouse, faUser } from '@fortawesome/free-solid-svg-icons';
import MainNavigationItem from './MainNavigationItem';
import styles from './MainNavigation.module.scss';
import { useNotificationsContext } from '@/src/context/NotificationsContext';
import { useEffect, useState } from 'react';

interface Props {}

const MainNavigation: NextPage<Props> = ({}) => {
  const [notificationsContext] = useNotificationsContext();
  const [notifications, setNotifications] = useState(0);

  useEffect(() => {
    setNotifications(notificationsContext.unreadMessages);
  }, [notificationsContext]);

  return (
    <nav className={styles.container}>
      <MainNavigationItem icon={faHouse} title={'Home'} />
      <MainNavigationItem icon={faUser} href="/usersManagement" title={'User Management'} />
      <MainNavigationItem
        icon={faBell}
        href="/notifications"
        title={'Notifications'}
        notifications={notifications}
      />
      <MainNavigationItem icon={faGear} href="/profileSettings" title={'Settings'} />
    </nav>
  );
};

export default MainNavigation;
