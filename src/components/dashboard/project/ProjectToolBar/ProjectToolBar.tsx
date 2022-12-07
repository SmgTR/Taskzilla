import PrimaryButton from '@/src/components/ui/buttons/PrimaryButton';
import { NextPage } from 'next';
import styles from './ProjectToolBar.module.scss';

interface Props {}

const ProjectToolBar: NextPage<Props> = ({}) => {
  return (
    <div className={styles.container}>
      <PrimaryButton
        btnType="button"
        btnText="Board view"
        title="Board view"
        styleClass={styles.toolbarButton}
      />
      <PrimaryButton
        btnType="button"
        btnText="Table view"
        title="Table view"
        styleClass={styles.toolbarButton}
      />
      <PrimaryButton
        btnType="button"
        btnText="List view"
        title="List view"
        styleClass={styles.toolbarButton}
      />
      <PrimaryButton
        btnType="button"
        btnText="Filter by"
        title="Filter by"
        styleClass={styles.filterButton}
      />
    </div>
  );
};

export default ProjectToolBar;
