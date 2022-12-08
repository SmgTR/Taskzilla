import AddButton from '@/src/components/ui/buttons/AddButton';
import {
  disablePopup,
  setActivePopup,
  setPopupParentId,
  usePopupContext
} from '@/src/context/PopupContext';

import Portal from '@/src/hoc/Portal';

import AddProjectPopup from './AddProjectPopup';
import ProjectItem from './ProjectItem';

import styles from './WorkspaceItem.module.scss';

const WorkspaceItem = ({ projects, name, id, owner, workspaceMember }: Workspace) => {
  const [popupContext, popupDispatch] = usePopupContext();

  const hideModalHandler = () => {
    popupDispatch(disablePopup());
  };

  const addProjectHandler = async () => {
    popupDispatch(setPopupParentId(id));
    popupDispatch(setActivePopup({ activePopup: 'project', popupId: id }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.workspaceManage}>
        <h4 className={styles.workspaceTitle}>{name}</h4>
        {workspaceMember && workspaceMember.length > 0 && workspaceMember[0].role === 'admin' && (
          <AddButton title="Add Project" onClickHandler={addProjectHandler} btnText="+" />
        )}
      </div>
      <ul className={styles.workspaceProjectList}>
        {projects &&
          projects.length > 0 &&
          projects.map((project) => {
            return <ProjectItem project={project} key={project.id} />;
          })}
      </ul>
      {popupContext.activePopup === 'project' && popupContext.popupId === id && (
        <Portal>
          <AddProjectPopup hidePopup={hideModalHandler} />
        </Portal>
      )}
    </div>
  );
};

export default WorkspaceItem;
