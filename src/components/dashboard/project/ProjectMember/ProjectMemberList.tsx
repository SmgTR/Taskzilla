import { NextPage } from 'next';
import PrimaryButton from '@/src/components/ui/buttons/PrimaryButton';
import ProjectMemberItem from './ProjectMemberItem';

import styles from './ProjectMemberList.module.scss';
import { useEffect, useState } from 'react';
import { useProjectContext } from '@/src/context/ProjectContext';
import { Socket, io } from 'socket.io-client';

import { useSession } from 'next-auth/react';
import { useActiveUsersContext } from '@/src/context/ActiveUsersContext';

interface Props {}

let socket: Socket;

const ProjectMemberList: NextPage<Props> = ({}) => {
  const projectContext = useProjectContext();

  const activeUsersContext = useActiveUsersContext();

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
      socketInitializer();
    }

    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  const socketInitializer = async () => {
    await fetch('/api/socket');
    socket = io('/projectActiveUsers');

    // socket.on('connect', () => {
    //   socket.emit('connect-user', projectContext[0].id, session?.user);
    // });

    socket.on('connected-users', (users) => {
      console.log('dadada');
      setUserList(users);
    });

    socket.on('disconnected-users', (users) => {
      return setUserList(users);
    });
  };

  return (
    <>
      <div className={styles.container}>
        {activeUsersContext[0].activeUsers.map((user) => {
          return <ProjectMemberItem key={user.email} user={user} />;
        })}
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
