import {
  disablePopup,
  setActivePopup,
  setPopupParentId,
  usePopupContext
} from '@/src/context/PopupContext';
import Portal from '@/src/hoc/Portal';
import { NextPage } from 'next';
import { forwardRef } from 'react';

import { Droppable, Draggable } from 'react-beautiful-dnd';

import AddButton from '../../ui/buttons/AddButton';
import MoreButton from '../../ui/buttons/MoreButton';
import TaskItem from '../tasks/TaskItem';
import AddTaskPopup from './AddTaskPopup';

import styles from './ColumnItem.module.scss';

interface Props {
  column: Column;
  projectId: string;
  placeholderProps: {
    clientHeight?: number;
    clientWidth?: number;
    clientY?: number;
    clientX?: number;
    destination?: string;
  };
  columnIndex: number;
}

const ColumnItem: NextPage<Props> = forwardRef(
  ({ column, projectId, placeholderProps, columnIndex }, ref) => {
    const [popupContext, popupDispatch] = usePopupContext();

    const hideModalHandler = () => {
      popupDispatch(disablePopup());
    };

    const showTaskPopupHandler = () => {
      popupDispatch(setActivePopup({ activePopup: 'task', popupId: column.id }));
      popupDispatch(setPopupParentId(projectId));
    };

    return (
      <>
        <Draggable draggableId={column.id ?? ''} index={columnIndex}>
          {(provided) => (
            <li
              className={styles.columnContainer}
              {...provided.draggableProps}
              ref={provided.innerRef}
            >
              <div className="columnWrapper">
                <div className={styles.columnItem} {...provided.dragHandleProps}>
                  <h4 className={styles.headline}>{column.name}</h4>
                  <MoreButton btnType="button" title="Manage column" />

                  <AddButton
                    btnText="+"
                    btnType="button"
                    title="Add Task"
                    onClickHandler={showTaskPopupHandler}
                  />
                </div>
                <Droppable droppableId={column.id ?? 'drop-list'} type="task">
                  {(provided) => (
                    <div
                      className={styles.taskList}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <ul className={styles.dndList}>
                        {column.Task && column.Task?.length > 0
                          ? column.Task?.map((task, index) => {
                              return <TaskItem key={task.id} task={task} index={index} />;
                            })
                          : ''}
                        {provided.placeholder}
                        {placeholderProps.destination === column.id && (
                          <li
                            className={styles.placeholder}
                            style={{
                              position: 'absolute',
                              top: placeholderProps.clientY,
                              left: placeholderProps.clientX,
                              height: placeholderProps.clientHeight,
                              width: placeholderProps.clientWidth
                            }}
                          />
                        )}
                      </ul>
                    </div>
                  )}
                </Droppable>
              </div>
            </li>
          )}
        </Draggable>

        {popupContext.activePopup === 'task' && popupContext.popupId === column.id && (
          <Portal>
            <AddTaskPopup hidePopup={hideModalHandler} columnId={column.id!} />
          </Portal>
        )}
      </>
    );
  }
);

ColumnItem.displayName = 'ColumnItem';

export default ColumnItem;
