import { NextPage } from 'next';
import Image from 'next/image';

import styles from './ProjectMemberItem.module.scss';

interface Props {
  user: {
    lastName: string;
    id: string;
    name: string;
    image: string;
    email?: string;
  };
}

const ProjectMemberItem: NextPage<Props> = ({ user }) => {
  const lastName = user.lastName ? user.lastName.charAt(0) : '';
  return (
    <div className={styles.container}>
      {user.image ? (
        <Image
          src={user.image}
          height="52px"
          width="52px"
          alt="avatar"
          className={styles.user_avatar}
        />
      ) : (
        <span>{`${(user.name.charAt(0) + lastName).toUpperCase()}`}</span>
      )}
    </div>
  );
};

export default ProjectMemberItem;
