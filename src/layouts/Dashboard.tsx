import WorkspaceList from '@/src/components/dashboard/workspacesList/WorkspacesList';
import DashboardContainer from '@/containers/DashboardContainer';
import MainNavContainer from '@/containers/MainNavContainer';
import DashboardContentContainer from '@/containers/DashboardContentContainer';
import { ReactNode } from 'react';
import { NextPage } from 'next';
import ProjectNavigation from '../components/dashboard/navigation/projectNavigation/ProjectNavigation';

interface Props {
  children: ReactNode;
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
