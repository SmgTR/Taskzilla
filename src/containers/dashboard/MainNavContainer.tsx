import { NextPage } from 'next';
import Logo from '@/components/logo/Logo';
import MainNavigation from '@/dashboard/navigation/mainNavigation/MainNavigiation';

import styles from './styles/MainNavContainer.module.scss';

interface Props {}

const MainNavContainer: NextPage<Props> = ({}) => {
  return (
    <div className={styles.navContainer}>
      <Logo />
      <MainNavigation />
    </div>
  );
};

export default MainNavContainer;
