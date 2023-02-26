import { FC } from 'react';
import Image from 'next/image';

import DashboardModal from '@/src/components/ui/modals/DashboardModal';

import styles from './AllUsersPopup.module.scss';

interface Props {
  hidePopup: () => void;
  usersList: ActiveUser[];
}

const AllUsersPopup: FC<Props> = ({ usersList, hidePopup }) => {
  return (
    <DashboardModal modalTitle="Active Users">
      <ul className={styles.users_list}>
        {usersList.map(({ email, image, name, lastName }) => {
          return (
            <li key="email" className={styles.user}>
              <Image
                src={image}
                alt={`${name} avatar`}
                width="45px"
                height="45px"
                className={styles.user_image}
              />
              <h5 className={styles.user_name}>{`${name} ${lastName ?? ''}`}</h5>
            </li>
          );
        })}
      </ul>
    </DashboardModal>
  );
};

export default AllUsersPopup;
