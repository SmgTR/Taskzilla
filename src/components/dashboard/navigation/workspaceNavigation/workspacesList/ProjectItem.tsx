import { NextPage } from 'next';

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

import styles from './ProjectItem.module.scss';

let socket: Socket;

const ProjectItem: NextPage<{ project: Project }> = ({ project }) => {
  const { name, owner, createdAt, id } = project;
  const router = useRouter();

  useEffect(() => {
    fetch('/api/socket').finally(() => {
      socket = io('/projectActiveUsers');
    });
  });

  const projectRouteHandler = () => {
    socket.disconnect();
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
