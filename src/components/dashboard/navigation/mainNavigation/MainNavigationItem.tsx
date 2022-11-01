import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NextPage } from 'next';
import Link from 'next/link';

import styles from './MainNavigationItem.module.scss';

interface NavigationItem {
  icon: IconProp;
  iconStyle?: {
    fontSize?: number;
    color?: string;
  };
}

const MainNavigationItem: NextPage<NavigationItem> = ({ icon, iconStyle }) => {
  const defaultIconStyle = {
    fontSize: 28,
    color: 'white'
  };

  return (
    <div className={styles.navigationItem}>
      <Link href="/">
        <FontAwesomeIcon icon={icon} style={iconStyle ? iconStyle : defaultIconStyle} />
      </Link>
    </div>
  );
};

export default MainNavigationItem;
