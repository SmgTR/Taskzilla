import DashboardContainer from '@/src/containers/dashboard/DashboardContainer';
import MainNavContainer from '@/src/containers/dashboard/MainNavContainer';
import DashboardContentContainer from '@/src/containers/dashboard/DashboardContentContainer';
import { ReactNode, useEffect, FC, useState } from 'react';
import WorkspaceNavigation from '@/src/components/dashboard/navigation/workspaceNavigation/WorkspaceNavigation';

import { PopupContextProvider } from '../context/PopupContext';

import { io, Socket } from 'socket.io-client';
import { useSession } from 'next-auth/react';
import { setActiveUsers, useActiveUsersContext } from '../context/ActiveUsersContext';
import { NotificationsContextProvider } from '../context/NotificationsContext';
import { WorkspaceProvider } from '../context/WorkspacesContext';
import useSWR from 'swr';

interface Props {
  children?: ReactNode;
  project?: Project;
}

let userSocket: Socket;

const Dashboard: FC<Props> = ({ children, project }) => {
  const { data: session } = useSession();

  const [_, dispatchActiveUsers] = useActiveUsersContext();

  useEffect(() => {
    if (project) userSocketInitializer(project);

    return () => {
      if (project) userSocket.disconnect();
    };
  }, [project]);

  const userSocketInitializer = async (socketProject: Project) => {
    await fetch('/api/socket');
    userSocket = io('/projectActiveUsers');

    userSocket.on('connect', () => {
      userSocket.emit('connect-user', socketProject.id, session?.user);
    });

    userSocket.on('connected-users', (users) => {
      dispatchActiveUsers(setActiveUsers({ activeUsers: users }));
    });

    userSocket.on('disconnected-users', (users) => {
      dispatchActiveUsers(setActiveUsers({ activeUsers: users }));
    });
  };

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
