import Project from '@/pages/project/[projectId]';
import { useProjectContext } from '@/src/context/ProjectContext';
import { setNewState } from '@/src/context/WorkspacesContext';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

import styles from './ProjectItem.module.scss';

let socket: Socket;

const ProjectItem: NextPage<{ project: Project }> = ({ project }) => {
  const { data: session } = useSession();
  const { name, owner, createdAt, id } = project;
  const router = useRouter();

  const [projectContext] = useProjectContext();

  useEffect(() => {
    if (!socket) {
      fetch('/api/socket');
      socket = io('/projectActiveUsers');
    }
  }, []);

  const projectRouteHandler = () => {
    socket.emit('disconnect-user', projectContext.id, session?.user);
    router.push(`/project/${id}`);
  };

  return (
    <li className={styles.container}>
      <button onClick={projectRouteHandler} className={styles.listButton}>
        <h4>{name}</h4>
      </button>
    </li>
  );
};

export default ProjectItem;
