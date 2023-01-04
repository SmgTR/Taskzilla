import {
  disablePopup,
  setActivePopup,
  setPopupParentId,
  usePopupContext
} from '@/src/context/PopupContext';
import { NextPage } from 'next';

import styles from './TaskItem.module.scss';

import { Draggable } from 'react-beautiful-dnd';
import MoreButton from '../../ui/buttons/MoreButton';
import Portal from '@/src/hoc/Portal';
import EditTaskPopup from './EditTaskPopup';
interface Props {
  task: Task;
  index: number;
  projectId: string;
  columnId: string;
}

const TaskItem: NextPage<Props> = ({ task, index, projectId, columnId }) => {
  const [popupContext, popupDispatch] = usePopupContext();

  const hideModalHandler = () => {
    popupDispatch(disablePopup());
  };

  const showTaskPopupHandler = () => {
    popupDispatch(setActivePopup({ activePopup: 'task', popupId: task.id }));
    popupDispatch(setPopupParentId(projectId));
  };
  return (
    <>
      <Draggable draggableId={task.id!} index={index}>
        {(provided) => (
          <li
            onClick={showTaskPopupHandler}
            className={styles.taskItem}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <div className={`${styles.content} ${task.description ? '' : styles.noDescription}`}>
              <h1 className={styles.taskName}>{task.name}</h1>
              {task.description ? <p className={styles.taskDescription}>{task.description}</p> : ''}
            </div>
            <MoreButton
              className={styles.editButton}
              dotsClass={styles.dots}
              onClickHandler={showTaskPopupHandler}
              title="more"
              btnType="button"
            ></MoreButton>
          </li>
        )}
      </Draggable>
      {popupContext.activePopup === 'task' && popupContext.popupId === task.id && (
        <Portal>
          <EditTaskPopup
            index={index}
            taskId={task.id!}
            hidePopup={hideModalHandler}
            columnId={columnId}
            projectId={projectId}
            task={task.name}
            message={`${task.description ? task.description : ''}`}
          />
        </Portal>
      )}
    </>
  );
};

export default TaskItem;
