import { NextPage } from 'next';
import ProjectHeader from '@/src/components/dashboard/project/projectHeader/ProjectHeader';

interface Props {}

const ProjectContainer: NextPage<Props> = ({}) => {
  return (
    <div>
      <ProjectHeader />
    </div>
  );
};

export default ProjectContainer;
