import { NextPage } from 'next';

import WorkspaceItem from './WorkspaceItem';
import { useWorkspacesContext } from '@/src/context/WorkspacesContext';

import styles from './WorkspaceList.module.scss';

const WorkspacesList: NextPage = () => {
  const context = useWorkspacesContext();
  const { memberIn, guestIn } = context[0];
  return (
    <div>
      <h4 className={styles.title}>Your workspaces</h4>
      <ul>
        {memberIn &&
          memberIn.map((workspace) => {
            const { name, projects, id, owner } = workspace;
            return <WorkspaceItem name={name} projects={projects} id={id} owner={owner} key={id} />;
          })}
      </ul>
      {memberIn.length === 0 && (
        <h4 className={styles.title}>
          You dont have any workspaces yet. Please create new workspace
        </h4>
      )}
      <ul>
        {guestIn &&
          guestIn.map((workspace) => {
            const { name, projects, id, owner } = workspace;
            return <WorkspaceItem name={name} projects={projects} id={id} owner={owner} key={id} />;
          })}
      </ul>
    </div>
  );
};

export default WorkspacesList;
