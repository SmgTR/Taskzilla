import WorkspaceList from '@/src/components/dashboard/workspacesList/WorkspaceList';
import DashboardContainer from '@/containers/DashboardContainer';
import MainNavContainer from '@/containers/MainNavContainer';
import DashboardContentContainer from '@/containers/DashboardContentContainer';
import { ReactNode } from 'react';
import { NextPage } from 'next';
import ProjectNavigation from '../components/dashboard/navigation/projectNavigation/ProjectNavigation';

interface Props {
  children: ReactNode;
  projectNav?: boolean;
}

const Dashboard: NextPage<Props> = ({ children, projectNav }) => {
  return (
    <>
      <DashboardContainer>
        <MainNavContainer />
        {projectNav ? <ProjectNavigation /> : ''}
        <DashboardContentContainer>
          <main>{children}</main>
        </DashboardContentContainer>
      </DashboardContainer>
    </>
  );
};

export default Dashboard;
