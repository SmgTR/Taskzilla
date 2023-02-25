import { NextPage } from 'next';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { io, Socket } from 'socket.io-client';

import ProjectHeader from '@/src/components/dashboard/project/projectHeader/ProjectHeader';
import ProjectMemberList from '@/src/components/dashboard/project/ProjectMember/ProjectMemberList';
import ProjectToolBar from '@/src/components/dashboard/project/ProjectToolBar/ProjectToolBar';
import { setActiveUsers, useActiveUsersContext } from '@/src/context/ActiveUsersContext';
import { useProjectContext } from '@/src/context/ProjectContext';

import styles from './styles/ProjectContainer.module.scss';

interface Props {}

let userSocket: Socket;

const ProjectContainer: NextPage<Props> = ({}) => {
  const { data: session } = useSession();

  const [projectContext] = useProjectContext();

  const [_, dispatchActiveUsers] = useActiveUsersContext();

  useEffect(() => {
    if (projectContext) userSocketInitializer(projectContext);
    return () => {
      if (projectContext && userSocket) userSocket.disconnect();
    };
  }, [projectContext]);

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

  return (
    <div className={styles.container}>
      <ProjectHeader />
      <ProjectMemberList />
      <ProjectToolBar />
    </div>
  );
};

export default ProjectContainer;
