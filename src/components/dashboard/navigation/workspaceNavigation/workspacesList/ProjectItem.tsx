import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './ProjectItem.module.scss';

const ProjectItem: NextPage<{ project: Project }> = ({ project }) => {
  const { name, owner, createdAt, id } = project;
  const router = useRouter();

  const projectRouteHandler = () => {
    router.push(`/project/${id}`);
  };

  return (
    <li className={styles.container}>
      <button onClick={projectRouteHandler} className={styles.listButton}>
        <h4>{name}</h4>
      </button>
    </li>
  );
};

export default ProjectItem;
