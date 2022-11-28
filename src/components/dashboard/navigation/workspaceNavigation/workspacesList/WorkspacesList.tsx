import { NextPage } from 'next';

import WorkspaceItem from './WorkspaceItem';
import { useWorkspacesContext } from '@/src/context/WorkspacesContext';

import styles from './WorkspaceList.module.scss';

const WorkspacesList: NextPage = () => {
  const context = useWorkspacesContext();
  console.log(context);
  const { memberIn, guestIn } = context[0];
  return (
    <div className={styles.container}>
      {/* <h4 className={styles.title}>All workspaces</h4> */}
      <h4 className={styles.sub_title}>Your workspaces</h4>
      <ul>
        {memberIn &&
          memberIn.map((workspace) => {
            const { name, projects, id, owner, workspaceMember } = workspace;
            workspace.workspaceMember;
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
      {memberIn.length === 0 && <h4 className={styles.add_title}>Create new workspace</h4>}
      {guestIn.length !== 0 && <h4 className={styles.sub_title}>Guest in</h4>}
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
