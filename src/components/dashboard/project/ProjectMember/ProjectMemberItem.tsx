import { NextPage } from 'next';
import Image from 'next/image';

import styles from './ProjectMemberItem.module.scss';

interface Props {}

const ProjectMemberItem: NextPage<Props> = ({}) => {
  return (
    <div className={styles.container}>
      {0 ? <Image src="/logotz.svg" height="52px" width="52px" alt="avatar" /> : <span>A</span>}
    </div>
  );
};

export default ProjectMemberItem;
