import { NextPage } from 'next';
import Logo from '@/components/logo/Logo';
import MainNavigation from '@/dashboard/navigation/mainNavigation/MainNavigiation';
import PrimaryButton from '@/src/components/ui/buttons/PrimaryButton';
import ProjectMemberItem from './ProjectMemberItem';

import styles from './ProjectMemberList.module.scss';

interface Props {}

let ownStyles = { padding: '8px 10px', minWidth: '140px', fontSize: '20px', fontWeight: 'bold' };

//let ProjectMembers = [{"id" : 1},{}];
const ProjectMemberList: NextPage<Props> = ({}) => {
  return (
    <div>
      <div className={styles.container}>
        <ProjectMemberItem />
        <ProjectMemberItem />
        <ProjectMemberItem />
      </div>
      <PrimaryButton btnType="button" btnText="Invite +" title="Invite" style={ownStyles} />
    </div>
  );
};

export default ProjectMemberList;
