import { useProjectContext } from '@/src/context/ProjectContext';
import { NextPage } from 'next';

import styles from './ProjectHeader.module.scss';

interface Props {}

const ProjectHeader: NextPage<Props> = ({}) => {
  const project = useProjectContext();
  return <h2 className={styles.headline}>{project[0].name}</h2>;
};

export default ProjectHeader;
