import { NextPage } from 'next';
import AddButton from '../../ui/buttons/AddButton';
import MoreButton from '../../ui/buttons/MoreButton';

import styles from './ColumnItem.module.scss';

interface Props {
  column: Column;
}

const ColumnItem: NextPage<Props> = ({ column }) => {
  return (
    <>
      <li className={styles.columnItem}>
        {column.name}
        <MoreButton btnType="button" title="Manage column" />

        <AddButton btnText="+" btnType="button" title="Add Column" />
      </li>
    </>
  );
};

export default ColumnItem;
