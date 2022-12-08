import { NextPage } from 'next';

import WorkspaceItem from './WorkspaceItem';
import { useWorkspacesContext } from '@/src/context/WorkspacesContext';

import styles from './WorkspaceList.module.scss';
import AddButton from '@/src/components/ui/buttons/AddButton';

import Portal from '@/src/hoc/Portal';
import WorkspacePopup from './WorkspacePopup';
import { disablePopup, setActivePopup, usePopupContext } from '@/src/context/PopupContext';

const WorkspacesList: NextPage = () => {
  const [context, dispatch] = useWorkspacesContext();
  const [popupContext, popupDispatch] = usePopupContext();
  const { memberIn, guestIn } = context;

  const showModalHandler = () => {
    popupDispatch(setActivePopup({ activePopup: 'workspace' }));
  };

  const hideModalHandler = () => {
    popupDispatch(disablePopup());
  };

  return (
    <div className={styles.container}>
      <div className={styles.addWorkspace}>
        <h4 className={styles.sub_title}>Your workspaces</h4>
        <AddButton btnText="+" title="Add workspace" onClickHandler={() => showModalHandler()} />
      </div>
      <ul>
        {memberIn &&
          memberIn.map((workspace) => {
            const { name, projects, id, owner, workspaceMember } = workspace;
            return (
              <WorkspaceItem
                name={name}
                projects={projects}
                id={id}
                owner={owner}
                key={id}
                workspaceMember={workspaceMember}
              />
            );
          })}
      </ul>

      {guestIn.length !== 0 && <h4 className={styles.sub_title}>Guest in</h4>}
      <ul>
        {guestIn &&
          guestIn.map((workspace) => {
            const { name, projects, id, owner } = workspace;
            return <WorkspaceItem name={name} projects={projects} id={id} owner={owner} key={id} />;
          })}
      </ul>
      {popupContext.activePopup === 'workspace' && (
        <Portal>
          <WorkspacePopup hidePopup={hideModalHandler} />
        </Portal>
      )}
    </div>
  );
};

export default WorkspacesList;
