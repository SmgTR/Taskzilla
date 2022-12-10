import DashboardContainer from '@/src/containers/dashboard/DashboardContainer';
import MainNavContainer from '@/src/containers/dashboard/MainNavContainer';
import DashboardContentContainer from '@/src/containers/dashboard/DashboardContentContainer';
import { ReactNode, useEffect } from 'react';
import { NextPage } from 'next';
import WorkspaceNavigation from '@/src/components/dashboard/navigation/workspaceNavigation/WorkspaceNavigation';

import { PopupContextProvider } from '../context/PopupContext';
import { io, Socket } from 'socket.io-client';
import { useSession } from 'next-auth/react';
import { setActiveUsers, useActiveUsersContext } from '../context/ActiveUsersContext';

interface Props {
  children?: ReactNode;
  project?: Project;
}

let socket: Socket;

const Dashboard: NextPage<Props> = ({ children, project }) => {
  const { data: session } = useSession();
  const [_, dispatchActiveUsers] = useActiveUsersContext();

  useEffect(() => {
    if (project) socketInitializer(project);

    return () => {
      if (project) socket.disconnect();
    };
  }, [project]);

  const socketInitializer = async (socketProject: Project) => {
    await fetch('/api/socket');
    socket = io('/projectActiveUsers');

    socket.on('connect', () => {
      socket.emit('connect-user', socketProject.id, session?.user);
    });

    socket.on('connected-users', (users) => {
      dispatchActiveUsers(setActiveUsers({ activeUsers: users }));
    });

    socket.on('disconnected-users', (users) => {
      dispatchActiveUsers(setActiveUsers({ activeUsers: users }));
    });
  };
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
