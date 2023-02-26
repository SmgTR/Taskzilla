import { NextPage } from 'next';
import PrimaryButton from '@/src/components/ui/buttons/PrimaryButton';
import ProjectMemberItem from './ProjectMemberItem';

import styles from './ProjectMemberList.module.scss';

import { useActiveUsersContext } from '@/src/context/ActiveUsersContext';
import { disablePopup, setActivePopup, usePopupContext } from '@/src/context/PopupContext';
import Portal from '@/src/hoc/Portal';
import InviteMemberPopup from './InviteMemberPopup';
import { useSession } from 'next-auth/react';
import AllUsersPopup from './AllUsersPopup';

interface Props {}

const ProjectMemberList: NextPage<Props> = ({}) => {
  const activeUsersContext = useActiveUsersContext();
  const { data: session } = useSession();
  const [popupContext, popupDispatch] = usePopupContext();

  const invitePopupHandler = async () => {
    popupDispatch(setActivePopup({ activePopup: 'invite' }));
  };

  const allUserPopupHandler = async () => {
    popupDispatch(setActivePopup({ activePopup: 'active-users-list' }));
  };

  const hideModalHandler = () => {
    popupDispatch(disablePopup());
  };

  const usersList = activeUsersContext[0].activeUsers;

  const displayUsersList = (userLists?: ActiveUser[], usersToDisplay = 6) => {
    const allUsers = usersList;
    const displayUsers = allUsers.slice(0, usersToDisplay);
    const hiddenUsers = allUsers.length - displayUsers.length;

    return (
      <div className={styles.usersList}>
        {displayUsers
          .sort((a) => {
            if (a.email === session?.user.email) return -1;
            return 1;
          })
          .map((user) => {
            return <ProjectMemberItem user={user} key={user.email} />;
          })}
        {hiddenUsers > 0 && (
          <button
            title="Show all users"
            className={styles.hiddenUsersList}
            onClick={allUserPopupHandler}
          >{`+${hiddenUsers}`}</button>
        )}
      </div>
    );
  };

  return (
    <>
      <div className={styles.container}>
        {displayUsersList(usersList)}

        <PrimaryButton
          btnType="button"
          btnText="Invite +"
          title="Invite"
          styleClass={styles.inviteButton}
          onClickHandler={invitePopupHandler}
        />
      </div>
      {popupContext.activePopup === 'invite' && (
        <Portal>
          <InviteMemberPopup hidePopup={hideModalHandler} />
        </Portal>
      )}
      {popupContext.activePopup === 'active-users-list' && (
        <Portal>
          <AllUsersPopup usersList={usersList} hidePopup={hideModalHandler} />
        </Portal>
      )}
    </>
  );
};

export default ProjectMemberList;
