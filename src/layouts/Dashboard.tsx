import useSWR from 'swr';
import { ReactNode, FC } from 'react';

import DashboardContainer from '@/src/containers/dashboard/DashboardContainer';
import MainNavContainer from '@/src/containers/dashboard/MainNavContainer';
import DashboardContentContainer from '@/src/containers/dashboard/DashboardContentContainer';
import WorkspaceNavigation from '@/src/components/dashboard/navigation/workspaceNavigation/WorkspaceNavigation';

import { PopupContextProvider } from '../context/PopupContext';

import { NotificationsContextProvider } from '../context/NotificationsContext';
import { WorkspaceProvider } from '../context/WorkspacesContext';

interface Props {
  children?: ReactNode;
}

const Dashboard: FC<Props> = ({ children }) => {
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR('/api/secure/workspace/getAllWorkspaces', fetcher);
  if (!data) return <p> Loading...</p>;
  if (error) return <p>Something went wrong please try again</p>;

  return (
    <>
      <PopupContextProvider>
        <WorkspaceProvider memberIn={data.memberIn ?? []} guestIn={data.guestIn ?? []}>
          <NotificationsContextProvider>
            <DashboardContainer>
              <MainNavContainer />
              <WorkspaceNavigation />
              <DashboardContentContainer>
                <main>{children}</main>
              </DashboardContentContainer>
            </DashboardContainer>
          </NotificationsContextProvider>
        </WorkspaceProvider>
      </PopupContextProvider>
    </>
  );
};

export default Dashboard;
