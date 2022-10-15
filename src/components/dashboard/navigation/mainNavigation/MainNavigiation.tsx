import { NextPage } from 'next';

import { faHouse } from '@fortawesome/free-solid-svg-icons';
import MainNavigationItem from './MainNavigationItem';

interface Props {}

const MainNavigiation: NextPage<Props> = ({}) => {
  return (
    <nav>
      <MainNavigationItem icon={faHouse} />
    </nav>
  );
};

export default MainNavigiation;
