import { NextPage } from 'next';
import Link from 'next/link';

import styles from './ProjectItem.module.scss';

const ProjectItem: NextPage<{ project: Project }> = ({ project }) => {
  const { name, owner, createdAt, id } = project;

  return (
    <Link href={`/project/${id}`}>
      <div className={styles.container}>
        <h4>{name}</h4>
        <p>{owner}</p>
        <p>{createdAt.toString()}</p>
      </div>
    </Link>
  );
};

export default ProjectItem;
