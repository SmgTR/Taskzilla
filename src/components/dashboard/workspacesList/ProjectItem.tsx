import { NextPage } from 'next';

import styles from './ProjectItem.module.scss';

const ProjectItem: NextPage<{ project: Project }> = ({ project }) => {
  const { name, owner, createdAt } = project;

  return (
    <div className={styles.container}>
      <h4>{name}</h4>
      <p>{owner}</p>
      <p>{createdAt.toString()}</p>
    </div>
  );
};

export default ProjectItem;
