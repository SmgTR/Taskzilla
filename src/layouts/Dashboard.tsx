import DashboardContainer from '@/containers/DashboardContainer';
import MainNavContainer from '@/containers/MainNavContainer';
import DashboardContentContainer from '@/containers/DashboardContentContainer';
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
        {/* <Flare flareStyle="flareBottom" />
        <Flare flareStyle="flareRight" />
        <Flare flareStyle="flareTop" /> */}
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
