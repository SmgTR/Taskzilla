import PrimaryButton from '@/src/components/ui/buttons/PrimaryButton';
import { NextPage } from 'next';
import styles from './ProjectToolBar.module.scss';

interface Props {}
let ownStyles = { padding: '8px 10px', minWidth: '140px', fontSize: '15px', fontWeight: 'bold' };
let ownStyles2 = {
  padding: '8px 10px',
  minWidth: '140px',
  marginLeft: 'auto',
  marginRight: '105px',
  fontSize: '15px',
  fontWeight: 'bold'
};

const ProjectToolBar: NextPage<Props> = ({}) => {
  return (
    <div className={styles.container}>
      <PrimaryButton btnType="button" btnText="Board view" title="Board view" style={ownStyles} />
      <PrimaryButton btnType="button" btnText="Table view" title="Table view" style={ownStyles} />
      <PrimaryButton btnType="button" btnText="List view" title="List view" style={ownStyles} />
      <PrimaryButton btnType="button" btnText="Filter by" title="Filter by" style={ownStyles2} />
    </div>
  );
};

export default ProjectToolBar;
