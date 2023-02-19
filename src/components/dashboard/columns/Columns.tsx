import { useColumnsContext } from '@/src/context/ColumnsContext';
import { createColumn } from '@/src/network/secure/column/createColumn';
import { NextPage } from 'next';
import PrimaryButton from '@/components/ui/buttons/PrimaryButton';
import ColumnItem from './ColumnItem';
import { io, Socket } from 'socket.io-client';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import styles from './Columns.module.scss';
import { FormEvent, useEffect, useRef, useState } from 'react';
import Button from '../../ui/buttons/Button';
import columnDragHelper from '@/src/utils/columnsUpdate/columnDragHelper';
import taskDragHelper from '@/src/utils/columnsUpdate/taskDragHelper';
import taskUpdateHelper from '@/src/utils/columnsUpdate/taskUpdateHelper';
import columnUpdateHelper from '@/src/utils/columnsUpdate/columnUpdateHelper';
import { useProjectContext } from '@/src/context/ProjectContext';

export type ColumnProps = {
  clientY: number;
  clientX: number;
  clientHeight: number;
  clientWidth: number;
  destination: string;
};

let socket: Socket;

const Columns: NextPage = () => {
  const queryAttr = 'data-rbd-drag-handle-draggable-id';
  const destinationQuertAttr = 'data-rbd-droppable-id';

  const [projectContext] = useProjectContext();

  const projectColumns = useColumnsContext();

  const { id: projectId } = projectContext;
  const formEl = useRef<HTMLFormElement>(null);

  const [openForm, setOpenForm] = useState(false);
  const [reorderColumns, setReorderColumns] = useState([] as Column[]);
  const [taskPlaceholderProps, setTaskPlaceholderProps] = useState({});
  const [columnPlaceholderProps, setColumnPlaceholderProps] = useState({} as ColumnProps);

  const columnFormHandler = () => {
    setOpenForm(true);
  };

  useEffect(() => {
    fetch('/api/socket');
    socket = io('/updateColumnTaskContent');

    if (socket) {
      socket.emit('connect-to-room', projectId);
      socket.on('new-order', (data) => {
        setReorderColumns(data);
      });
    }
    return () => {
      if (socket) socket.disconnect();
    };
  }, [projectId]);

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
          projectId: projectId ?? ''
        });
        if (newColumn) {
          projectColumns.updateColumns(newColumn);
          setOpenForm(false);
          socket.emit('add-column-data', [...reorderColumns, newColumn]);
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
    setTaskPlaceholderProps({});
    setColumnPlaceholderProps({} as ColumnProps);

    const { destination, source, draggableId, type } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId && destination.index === source.index)
    ) {
      return;
    }

    if (type === 'column') {
      columnDragHelper({
        reorderColumns,
        draggableId,
        source,
        destination,
        socket
      });
    } else {
      if (reorderColumns && reorderColumns?.length > 0) {
        taskDragHelper({ reorderColumns, draggableId, source, destination, socket });
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

    if (event.type === 'task') {
      taskUpdateHelper({ draggedDOM, droppedDOM, event, setTaskPlaceholderProps });
    }

    if (event.type === 'column') {
      columnUpdateHelper({ draggedDOM, droppedDOM, event, setColumnPlaceholderProps });
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

  if (reorderColumns && reorderColumns?.length > 0) {
    return (
      <div className={styles.columnsContainer}>
        <DragDropContext onDragEnd={onDragEnd} onDragUpdate={handleDragUpdate}>
          <Droppable droppableId={projectId ?? ''} direction="horizontal" type="column">
            {(provided) => (
              <ul
                className={styles.columnsList}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {reorderColumns.length > 0 &&
                  reorderColumns.map((column, index) => {
                    return (
                      <ColumnItem
                        column={column}
                        projectId={projectId ?? ''}
                        key={(column.id ?? '') + index.toString()}
                        placeholderProps={taskPlaceholderProps}
                        columnIndex={index}
                      />
                    );
                  })}
                {provided.placeholder}
                {columnPlaceholderProps && (
                  <li
                    className={styles.columnPlaceholder}
                    style={{
                      position: 'absolute',
                      top: columnPlaceholderProps.clientY,
                      left: columnPlaceholderProps.clientX,
                      height: columnPlaceholderProps.clientHeight,
                      width: columnPlaceholderProps.clientWidth
                    }}
                  />
                )}
                <li className={styles.columnsButton}>{addColumnForm}</li>
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
  return <div className={styles.empty_columns}>{addColumnForm}</div>;
};

export default Columns;
