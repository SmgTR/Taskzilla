import { NextPage } from 'next';
import PrimaryButton from '@/src/components/ui/buttons/PrimaryButton';
import ProjectMemberItem from './ProjectMemberItem';

import styles from './ProjectMemberList.module.scss';

import { useActiveUsersContext } from '@/src/context/ActiveUsersContext';
import { disablePopup, setActivePopup, usePopupContext } from '@/src/context/PopupContext';
import Portal from '@/src/hoc/Portal';
import InviteMemberPopup from './InviteMemberPopup';

interface Props {}

const ProjectMemberList: NextPage<Props> = ({}) => {
  const activeUsersContext = useActiveUsersContext();
  const [popupContext, popupDispatch] = usePopupContext();

  const addProjectHandler = async () => {
    popupDispatch(setActivePopup({ activePopup: 'invite' }));
  };

  const hideModalHandler = () => {
    popupDispatch(disablePopup());
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
          onClickHandler={addProjectHandler}
        />
      </div>
      {popupContext.activePopup === 'invite' && (
        <Portal>
          <InviteMemberPopup hidePopup={hideModalHandler} />
        </Portal>
      )}
    </>
  );
};

export default ProjectMemberList;
