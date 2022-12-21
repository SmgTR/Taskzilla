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
}

const TaskItem: NextPage<Props> = ({ task, index, projectId }) => {
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
            className={styles.taskItem}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            {task.name}
            <MoreButton
              className={styles.editButton}
              onClickHandler={showTaskPopupHandler}
              title="more"
              btnType="button"
            ></MoreButton>
          </li>
        )}
      </Draggable>
      {popupContext.activePopup === 'task' && popupContext.popupId === task.id && (
        <Portal>
          <EditTaskPopup taskId={task.id} hidePopup={hideModalHandler} columnId={task.id!} />
        </Portal>
      )}
    </>
  );
};

export default TaskItem;
