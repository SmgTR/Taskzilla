import { NextPage } from 'next';

import WorkspaceItem from './workspaceItem';
import { useWorkspacesContext } from '@/src/context/WorkspacesContext';

const WorkspaceList: NextPage = () => {
  const { guestIn, memberIn } = useWorkspacesContext();
  return (
    <div>
      <h4>Your workspaces</h4>
      <ul>
        {memberIn &&
          memberIn.map((workspace) => {
            const { name, projects, id, owner } = workspace;
            return <WorkspaceItem name={name} projects={projects} id={id} owner={owner} key={id} />;
          })}
      </ul>
      <h4>You are guest in</h4>
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

export default WorkspaceList;
