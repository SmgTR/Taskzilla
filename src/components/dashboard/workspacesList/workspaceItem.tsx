import { NextPage } from 'next';
import ProjectItem from './ProjectItem';

import styles from './workspaceItem.module.scss';

const WorkspaceItem = ({ projects, name, id, owner }: Workspace) => {
  console.log(projects);
  return (
    <div className={styles.container}>
      <h1>{name}</h1>
      <ul>
        {projects.map((project) => {
          return <ProjectItem project={project} key={project.id} />;
        })}
      </ul>
    </div>
  );
};

export default WorkspaceItem;
