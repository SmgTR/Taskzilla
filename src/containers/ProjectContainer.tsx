import { NextPage } from 'next';
import ProjectHeader from '@/src/components/dashboard/project/projectHeader/ProjectHeader';
import ProjectMemberList from '@/src/components/dashboard/project/ProjectMember/ProjectMemberList';
import ProjectToolBar from '@/src/components/dashboard/project/ProjectToolBar/ProjectToolBar';

import styles from './styles/ProjectContainer.module.scss';

interface Props {}

const ProjectContainer: NextPage<Props> = ({}) => {
  return (
    <div className={styles.container}>
      <ProjectHeader />
      <ProjectMemberList />
      <ProjectToolBar />
    </div>
  );
};

export default ProjectContainer;
