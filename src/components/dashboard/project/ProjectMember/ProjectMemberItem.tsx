import { NextPage } from 'next';
import Image from 'next/image';
import { useState, useEffect } from 'react';

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
  const [showNamePopup, setShowNamePopup] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    let timeOut: NodeJS.Timeout;
    if (hovering) {
      timeOut = setTimeout(() => {
        setShowNamePopup(true);
      }, 1000);
    }
    return () => {
      clearTimeout(timeOut);
    };
  }, [hovering]);
  const lastName = user.lastName ? user.lastName.charAt(0) : '';
  return (
    <div
      className={styles.container}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setShowNamePopup(false);
        setHovering(false);
      }}
    >
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
      {showNamePopup && (
        <div className={styles.name_popup}>
          <h5>{`${user.name + user.lastName ?? ''}`}</h5>
        </div>
      )}
    </div>
  );
};

export default ProjectMemberItem;
