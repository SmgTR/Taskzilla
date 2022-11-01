import { NextPage } from 'next';

import { faBell, faGear, faHouse, faUser } from '@fortawesome/free-solid-svg-icons';
import MainNavigationItem from './MainNavigationItem';

interface Props {}

const MainNavigation: NextPage<Props> = ({}) => {
  return (
    <nav>
      <MainNavigationItem icon={faHouse} title={'Home'} />
      <MainNavigationItem icon={faUser} href="/usersManagement" title={'User Management'} />
      <MainNavigationItem icon={faBell} href="/notifications" title={'Notifications'} />
      <MainNavigationItem icon={faGear} href="/profileSettings" title={'Settings'} />
    </nav>
  );
};

export default MainNavigation;
