import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import styles from './MainNavigationItem.module.scss';

interface NavigationItem {
  icon: IconProp;
  iconStyle?: {
    fontSize?: number;
    color?: string;
  };
  href?: string;
  title: string;
}

const MainNavigationItem: NextPage<NavigationItem> = ({ icon, iconStyle, href, title }) => {
  const url = useRouter();

  const defaultIconStyle = {
    fontSize: 24,
    color: 'white'
  };

  const path = href ?? '/';

  const menuNavHandler = () => {
    url.push(path);
  };

  return (
    <div
      className={`${styles.navigationItem} ${url.pathname === path ? styles.activeNavItem : ''}`}
    >
      <button onClick={menuNavHandler} title={title}>
        <FontAwesomeIcon icon={icon} style={iconStyle ? iconStyle : defaultIconStyle} />
      </button>
    </div>
  );
};

export default MainNavigationItem;
