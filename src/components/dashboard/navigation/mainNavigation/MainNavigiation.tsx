import { NextPage } from 'next';

import { faBell, faGear, faHouse, faUser } from '@fortawesome/free-solid-svg-icons';
import MainNavigationItem from './MainNavigationItem';

interface Props {}

const MainNavigiation: NextPage<Props> = ({}) => {
  return (
    <nav>
      <MainNavigationItem icon={faHouse} />
      <MainNavigationItem icon={faUser} />
      <MainNavigationItem icon={faBell} />
      <MainNavigationItem icon={faGear} />
    </nav>
  );
};

export default MainNavigiation;
