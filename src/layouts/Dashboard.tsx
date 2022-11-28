import DashboardContainer from '@/src/containers/dashboard/DashboardContainer';
import MainNavContainer from '@/src/containers/dashboard/MainNavContainer';
import DashboardContentContainer from '@/src/containers/dashboard/DashboardContentContainer';
import { ReactNode } from 'react';
import { NextPage } from 'next';
import ProjectNavigation from '@/src/components/dashboard/navigation/workspaceNavigation/WorkspaceNavigation';
import Flare from '@/components/ui/misc/Flare';

import styles from './Dashboard.module.scss';

interface Props {
  children?: ReactNode;
}

const Dashboard: NextPage<Props> = ({ children }) => {
  return (
    <>
      <DashboardContainer>
        <MainNavContainer />
        <ProjectNavigation />
        <DashboardContentContainer>
          <main>{children}</main>
        </DashboardContentContainer>
      </DashboardContainer>
    </>
  );
};

export default Dashboard;
