import { NextPage } from 'next';
import { ReactNode } from 'react';

import styles from './styles/DashboardContainer.module.scss';

interface WrapperProps {
  children: ReactNode;
}

const DashboardWrapper: NextPage<WrapperProps> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default DashboardWrapper;
