import AddButton from '@/src/components/ui/buttons/AddButton';
import { addWorkspaceProject, useWorkspacesContext } from '@/src/context/WorkspacesContext';
import { createProject } from '@/src/network/secure/project/createProject';
import { useRouter } from 'next/router';
import ProjectItem from './ProjectItem';

import styles from './WorkspaceItem.module.scss';

const WorkspaceItem = ({ projects, name, id, owner }: Workspace) => {
  const router = useRouter();

  const [_, dispatch] = useWorkspacesContext();

  const addProjectHandler = async () => {
    const project = await createProject({
      name: 'New project',
      description: 'DAdadada',
      type: 'private',
      image: '',
      workspaceId: id
    });
    if (project) {
      dispatch(addWorkspaceProject(project));
      router.push(`/project/${project.id}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.workspaceManage}>
        <h4 className={styles.workspaceTitle}>{name}</h4>
        <AddButton title="Add Project" onClickHandler={addProjectHandler} btnText="+" />
      </div>
      <ul>
        {projects.map((project) => {
          return <ProjectItem project={project} key={project.id} />;
        })}
      </ul>
    </div>
  );
};

export default WorkspaceItem;
