import { useColumnsContext } from '@/src/context/ColumnsContext';
import { createTask } from '@/src/network/secure/tasks/createTask';
import { NextPage } from 'next';
import AddButton from '../../ui/buttons/AddButton';
import MoreButton from '../../ui/buttons/MoreButton';
import TaskItem from '../tasks/TaskItem';

import styles from './ColumnItem.module.scss';

interface Props {
  column: Column;
  projectId: string;
}

const ColumnItem: NextPage<Props> = ({ column, projectId }) => {
  const addColumnTaskHandler = async () => {
    return await createTask({
      name: 'Vestibulum pulvinar hendrerit nunc et volutpat. Aenean hendrerit tincidunt facilisis. Praesent non nunc enim. Pellentesque condimentum porttitor libero ut malesuada. Vivamus ac imperdiet neque.',
      projectId,
      columnId: column.id ?? ''
    });
  };

  return (
    <>
      <li>
        <div className={styles.columnItem}>
          <h4 className={styles.headline}>{column.name}</h4>
          <MoreButton btnType="button" title="Manage column" />

          <AddButton
            btnText="+"
            btnType="button"
            title="Add Task"
            onClickHandler={addColumnTaskHandler}
          />
        </div>
        <ul className={styles.taskList}>
          {column.Task && column.Task?.length > 0
            ? column.Task?.map((task) => {
                return <TaskItem key={task.id} name={task.name} />;
              })
            : ''}
        </ul>
      </li>
    </>
  );
};

export default ColumnItem;
