import { updateNotification } from '@/src/context/NotificationsContext';
import { addGuestWorkspace, useWorkspacesContext } from '@/src/context/WorkspacesContext';
import { manageInvitation } from '@/src/network/secure/invite/manageInvitation';
import formatDate from '@/src/utils/formatDate';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Button from '../../ui/buttons/Button';

import styles from './NotificationItem.module.scss';

interface Props {
  notification: NotificationData;
}

const NotificationItem: NextPage<Props> = ({ notification }) => {
  const [_, dispatch] = useWorkspacesContext();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(notification.invitation.active);
  }, [notification.invitation.active]);

  const invitationHandler = async (reject?: boolean) => {
    const projectInvitation = await manageInvitation({
      newMemberId: notification.userId,
      invitationId: notification.invitation.id,
      reject: reject ?? false
    });
    setIsActive(false);
    if (!reject && projectInvitation) dispatch(addGuestWorkspace(projectInvitation.workspace));
  };

  const message = () => {
    const { type, createdAt } = notification;
    const { user, project } = notification.invitation;

    const eventDate = formatDate(createdAt);

    if (type === 'INVITATION') {
      return (
        <div className={styles.notificationItem}>
          <p>{`You have an invite to project "${project.name}" from ${user.name} ${
            user.lastName ? user.lastName : ''
          }`}</p>
          {isActive && (
            <span>
              <Button
                btnText={'Accept'}
                title={'Accept'}
                classStyle={styles.acceptButton}
                onClickHandler={() => invitationHandler(false)}
              />
              <Button
                btnText={'Reject'}
                title={'Reject'}
                classStyle={styles.rejectButton}
                onClickHandler={() => invitationHandler(true)}
              />
            </span>
          )}
          <span className={styles.dateText}>{eventDate}</span>
        </div>
      );
    } else {
      return '';
    }
  };

  return (
    <li className={`${styles.notification} ${!isActive ? styles.inactive : ''}`}>{message()}</li>
  );
};

export default NotificationItem;
