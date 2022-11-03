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
    const newTask = await createTask({
      name: 'new task',
      projectId,
      columnId: column.id ?? ''
    });
    console.log({ newTask }, column);
  };

  return (
    <>
      <li>
        <div className={styles.columnItem}>
          {column.name}
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
