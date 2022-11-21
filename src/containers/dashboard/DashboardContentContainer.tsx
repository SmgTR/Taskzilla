import { NextPage } from 'next';
import { ReactNode } from 'react';

import styles from './styles/DashboardContentContainer.module.scss';

interface DashboardContentProps {
  children: ReactNode;
}

const DashboardContentContainer: NextPage<DashboardContentProps> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default DashboardContentContainer;
