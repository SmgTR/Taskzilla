import SearchInput from '@/src/components/ui/inputs/SearchInput';
import { NextPage } from 'next';
import WorkspaceList from './workspacesList/WorkspacesList';

import styles from './WorkspaceNavigation.module.scss';

interface Props {}

const WorkspaceNavigation: NextPage<Props> = ({}) => {
  return (
    <div className={styles.container}>
      <SearchInput searchText="Search here..." />
      <WorkspaceList />
    </div>
  );
};

export default WorkspaceNavigation;
