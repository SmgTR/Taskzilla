import { useProjectContext } from '@/src/context/ProjectContext';
import { NextPage } from 'next';

interface Props {}

const ProjectHeader: NextPage<Props> = ({}) => {
  const project = useProjectContext();
  return <h2>{project[0].name}</h2>;
};

export default ProjectHeader;
