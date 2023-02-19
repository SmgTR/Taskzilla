import { Socket } from 'socket.io-client';

interface ColumnUpdate {
  reorderColumns: Column[];
  draggableId: string;
  source: any;
  destination: any;
  socket: Socket;
}

export default function taskDragHelper({
  reorderColumns,
  draggableId,
  source,
  destination,
  socket
}: ColumnUpdate) {
  const updateColumnStart = reorderColumns.find((column) => {
    if (column.id === source.droppableId) return column;
  });

  const updateColumnFinish = reorderColumns.find((column) => {
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

        socket.emit('update-task-order', {
          taskOrder,
          newOrder: reorderColumns
        });
      }
    }
  } else {
    if (updateColumnStart && updateColumnFinish) {
      const updateTask = updateColumnStart?.Task?.find((task) => {
        if (task.id === draggableId) return task;
      });
      updateColumnStart?.Task!.splice(source.index, 1);
      if (!updateColumnFinish.Task && updateTask) {
        updateColumnFinish.Task = [updateTask];
      } else {
        updateColumnFinish?.Task!.splice(destination.index, 0, updateTask!);
      }
      const taskOrder = updateColumnFinish?.Task?.map((task, index) => {
        return { id: task.id, order: index };
      });

      socket.emit('update-task-order', {
        taskOrder,
        targetColumnId: destination.droppableId,
        taskId: draggableId,
        newOrder: reorderColumns
      });
    }
  }
}
