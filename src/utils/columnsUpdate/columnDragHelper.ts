import { Socket } from 'socket.io-client';

interface ColumnUpdate {
  reorderColumns: Column[];
  draggableId: string;
  source: any;
  destination: any;
  socket: Socket;
}

export default function columnDragHelper({
  reorderColumns,
  draggableId,
  source,
  destination,
  socket
}: ColumnUpdate) {
  const draggableColumn = reorderColumns.find((column) => column.id === draggableId);
  if (draggableColumn) {
    const newColumnOrder = Array.from(reorderColumns);
    newColumnOrder.splice(source.index, 1);
    newColumnOrder.splice(destination.index, 0, draggableColumn);

    const columnOrder = newColumnOrder.map((task, index) => {
      return { id: task.id, order: index };
    });

    socket.emit('update-column', {
      columnOrder,
      newColumnOrder
    });
  }
}
