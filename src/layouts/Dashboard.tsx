import DashboardContainer from '@/src/containers/dashboard/DashboardContainer';
import MainNavContainer from '@/src/containers/dashboard/MainNavContainer';
import DashboardContentContainer from '@/src/containers/dashboard/DashboardContentContainer';
import { ReactNode } from 'react';
import { NextPage } from 'next';
import WorkspaceNavigation from '@/src/components/dashboard/navigation/workspaceNavigation/WorkspaceNavigation';

import { PopupContextProvider } from '../context/PopupContext';

interface Props {
  children?: ReactNode;
}

const Dashboard: NextPage<Props> = ({ children }) => {
  return (
    <>
      <PopupContextProvider>
        <DashboardContainer>
          <MainNavContainer />
          <WorkspaceNavigation />
          <DashboardContentContainer>
            <main>{children}</main>
          </DashboardContentContainer>
        </DashboardContainer>
      </PopupContextProvider>
    </>
  );
};

export default Dashboard;
