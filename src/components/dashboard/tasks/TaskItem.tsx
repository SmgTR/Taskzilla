import { NextPage } from 'next';

import styles from './TaskItem.module.scss';

import { Draggable } from 'react-beautiful-dnd';

interface Props {
  task: Task;
  index: number;
}

const TaskItem: NextPage<Props> = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id!} index={index}>
      {(provided) => (
        <li
          className={styles.taskItem}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          {task.name}
        </li>
      )}
    </Draggable>
  );
};

export default TaskItem;
