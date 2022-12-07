import { useColumnsContext } from '@/src/context/ColumnsContext';
import { useProjectContext } from '@/src/context/ProjectContext';
import { createColumn } from '@/src/network/secure/column/createColumn';
import { NextPage } from 'next';
import PrimaryButton from '@/components/ui/buttons/PrimaryButton';
import ColumnItem from './ColumnItem';
import { io, Socket } from 'socket.io-client';
import { DragDropContext } from 'react-beautiful-dnd';

import styles from './Columns.module.scss';
import { FormEvent, useEffect, useRef, useState } from 'react';
import Button from '../../ui/buttons/Button';
import axios from 'axios';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';

interface Props {
  projectId: string;
}

let socket: Socket;

const Columns: NextPage<Props> = ({ projectId }) => {
  const queryAttr = 'data-rbd-drag-handle-draggable-id';
  const destinationQuertAttr = 'data-rbd-droppable-id';

  const projectColumns = useColumnsContext();
  const formEl = useRef<HTMLFormElement>(null);

  const [openForm, setOpenForm] = useState(false);
  const [reorderColumns, setReorderColumns] = useState([] as Column[]);
  const [placeholderProps, setPlaceholderProps] = useState({});

  const columnFormHandler = () => {
    setOpenForm(true);
  };

  useEffect(() => {
    socketInitializer(projectId);
  }, [projectId, reorderColumns]);

  const socketInitializer = async (projectId: string) => {
    await fetch('/api/socket');
    socket = io('/updateColumnTaskContent');

    socket.emit('connect-to-room', projectId);

    socket.on('new-task-order', (data) => {
      setReorderColumns(data);
      console.log(reorderColumns, data);
    });
  };

  useEffect(() => {
    setOpenForm(false);
    if (projectColumns.columns) setReorderColumns(projectColumns.columns);
  }, [projectId, projectColumns.columns]);

  const addColumnHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formEl.current) {
      const formInputs = Array.from(formEl.current.elements) as HTMLInputElement[];
      const inputType = formInputs.filter((element) => {
        if (element.name) return element;
      });
      const submittedValues = inputType.map((input) => {
        return { [input.name]: input.value };
      });

      const userData = Object.assign({}, ...submittedValues);

      if (userData.name.length > 0) {
        const newColumn = await createColumn({
          name: userData.name,
          projectId
        });
        if (newColumn) {
          projectColumns.updateColumns(newColumn);
          setOpenForm(false);
        }
      }
    }
  };

  if (projectColumns.loading) return <p>Loading...</p>;

  const addColumnForm = (
    <form
      className={styles.addForm && openForm ? styles.openForm : ''}
      ref={formEl}
      onSubmit={addColumnHandler}
    >
      <PrimaryButton
        btnType="button"
        btnText="Add column"
        title="Add Column"
        onClickHandler={columnFormHandler}
        styleClass={`${styles.addColumnButton} ${openForm ? styles.hideElement : ''}`}
      />
      {openForm && (
        <input
          type="text"
          title="column name"
          className={`${styles.addColumnInput}`}
          placeholder="Enter column name"
          {...(openForm && { autoFocus: true })}
          name="name"
          autoComplete="off"
        />
      )}
      <div className={`${styles.addColumnRow} ${openForm && styles.showElement}`}>
        <PrimaryButton
          btnType="submit"
          btnText="Add Column"
          title="Add Column"
          styleClass={styles.formButton}
        />
        <Button
          title="close form"
          btnText="x"
          onClickHandler={() => setOpenForm(false)}
          classStyle={styles.closeFormButton}
        />
      </div>
    </form>
  );

  const onDragEnd = async (result: any) => {
    setPlaceholderProps({});
    const { destination, source, draggableId } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId && destination.index === source.index)
    ) {
      return;
    }
    if (projectColumns.columns && projectColumns.columns?.length > 0) {
      const updateColumnStart = projectColumns.columns.find((column) => {
        if (column.id === source.droppableId) return column;
      });

      const updateColumnFinish = projectColumns.columns.find((column) => {
        if (column.id === destination.droppableId) return column;
      });

      if (updateColumnStart?.id === updateColumnFinish?.id) {
        if (updateColumnStart && updateColumnStart.Task) {
          const updateTask = updateColumnStart.Task.find((task) => {
            if (task.id === draggableId) return task;
          });

          if (updateTask) {
            updateColumnStart?.Task!.splice(source.index, 1);
            updateColumnStart?.Task!.splice(destination.index, 0, updateTask);
            const taskOrder = updateColumnStart.Task.map((task, index) => {
              return { id: task.id, order: index };
            });
            socket.emit('update-task', {
              taskOrder,
              newOrder: reorderColumns
            });
          }
        }
      } else {
        if (
          updateColumnStart &&
          updateColumnStart.Task &&
          updateColumnFinish &&
          updateColumnFinish.Task
        ) {
          const updateTask = updateColumnStart.Task.find((task) => {
            if (task.id === draggableId) return task;
          });
          updateColumnStart?.Task!.splice(source.index, 1);
          updateColumnFinish?.Task!.splice(destination.index, 0, updateTask!);
          const taskOrder = updateColumnFinish.Task.map((task, index) => {
            return { id: task.id, order: index };
          });
          console.log(reorderColumns);
          socket.emit('update-task', {
            taskOrder,
            targetColumnId: destination.droppableId,
            taskId: draggableId,
            newOrder: reorderColumns
          });
        }
      }
    }
  };

  const handleDragUpdate = (event: any) => {
    if (!event.destination) {
      return;
    }

    const draggedDOM = getDraggedDom(event.draggableId);
    const droppedDOM = getDestinationDom(event.destination.droppableId);

    if (!draggedDOM) {
      return;
    }

    const { clientHeight, clientWidth } = draggedDOM;
    const sourceIndex = event.source.index;
    if (draggedDOM.parentNode && droppedDOM) {
      const destinationIndex = event.destination.index;

      const childrenArray = Array.from(draggedDOM.parentNode.children);

      const movedItem = childrenArray[sourceIndex];
      childrenArray.splice(sourceIndex, 1);
      const destinationChildrenArray = Array.from(droppedDOM.children[0].children);
      let updatedArray;
      if (draggedDOM.parentNode === droppedDOM) {
        updatedArray = [
          ...childrenArray.slice(0, destinationIndex),
          movedItem,
          ...childrenArray.slice(destinationIndex + 1)
        ];
      } else {
        updatedArray = [
          ...destinationChildrenArray.slice(0, destinationIndex),
          movedItem,
          ...destinationChildrenArray.slice(destinationIndex + 1)
        ];
      }

      const clientY =
        parseFloat(window.getComputedStyle(draggedDOM.parentNode as HTMLElement).paddingTop) +
        updatedArray.slice(0, destinationIndex).reduce((total, curr) => {
          const style = window.getComputedStyle(curr);
          const marginTop = parseFloat(style.marginTop);
          return total + curr.clientHeight + marginTop;
        }, 0);

      setPlaceholderProps({
        destination: event.destination.droppableId,
        clientHeight,
        clientWidth,
        clientY,
        clientX: parseFloat(window.getComputedStyle(draggedDOM.parentNode as Element).paddingLeft)
      });
    }
  };

  const getDraggedDom = (draggableId: string) => {
    const domQuery = `[${queryAttr}='${draggableId}']`;
    const draggedDOM = document.querySelector(domQuery);

    return draggedDOM;
  };

  const getDestinationDom = (dropabbleId: any) => {
    const domQuery = `[${destinationQuertAttr}='${dropabbleId}']`;
    const destinationDOm = document.querySelector(domQuery);
    return destinationDOm;
  };

  if (projectColumns.columns && projectColumns.columns?.length > 0) {
    return (
      <div className={styles.columnsContainer}>
        <DragDropContext onDragEnd={onDragEnd} onDragUpdate={handleDragUpdate}>
          <ul className={styles.columnsList}>
            {reorderColumns.length > 0 &&
              reorderColumns.map((column, index) => {
                return (
                  <ColumnItem
                    column={column}
                    projectId={projectId}
                    key={(column.id ?? '') + index.toString()}
                    placeholderProps={placeholderProps}
                  />
                );
              })}
            <li className={styles.columnsButton}>{addColumnForm}</li>
          </ul>
        </DragDropContext>
      </div>
    );
  }
  return <div className={styles.empty_columns}>{addColumnForm}</div>;
};

export default Columns;
