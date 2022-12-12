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
  const activeUsersContext = useActiveUsersContext();

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
