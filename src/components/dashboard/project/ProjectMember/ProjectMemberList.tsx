import { NextPage } from 'next';
import Logo from '@/components/logo/Logo';
import MainNavigation from '@/dashboard/navigation/mainNavigation/MainNavigiation';
import PrimaryButton from '@/src/components/ui/buttons/PrimaryButton';
import ProjectMemberItem from './ProjectMemberItem';

import styles from './ProjectMemberList.module.scss';
import { useEffect, useState } from 'react';
import { useProjectContext } from '@/src/context/ProjectContext';
import { Socket, io } from 'socket.io-client';

import { useSession } from 'next-auth/react';

interface Props {}

let socket: Socket;

const ProjectMemberList: NextPage<Props> = ({}) => {
  const projectContext = useProjectContext();

  const { data: session } = useSession();

  const [userList, setUserList] = useState([
    {
      email: '',
      name: '',
      id: '',
      image: '',
      lastName: ''
    }
  ]);

  useEffect(() => {
    if (session?.user) {
      const project = projectContext;
      if (project[0].id) socketInitializer(project[0].id);
    }

    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  const socketInitializer = async (projectId: string) => {
    await fetch('/api/socket');
    socket = io('/projectActiveUsers');

    socket.on('connect', () => {
      socket.emit('connect-user', projectId, session?.user);
    });

    socket.on('connected-users', (user) => {
      console.log(user);
      setUserList(user);
    });
  };

  return (
    <>
      <div className={styles.container}>
        {userList.map((user) => (
          <ProjectMemberItem key={user.email} user={user} />
        ))}
        <PrimaryButton
          btnType="button"
          btnText="Invite +"
          title="Invite"
          styleClass={styles.inviteButton}
        />
      </div>
    </>
  );
};

export default ProjectMemberList;
