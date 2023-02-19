import { prisma } from 'prisma/prisma';

import {
  ProjectActiveUsersSocket,
  TaskDataExtended,
  AddColumnDataExtended,
  UpdateColumnDataExtended
} from '@/types/SocketTypes';

export const connectColumnSocket = (socket: ProjectActiveUsersSocket, roomName: string) => {
  socket.join(roomName);
  socket.room = roomName;
};

export const updateTaskOrder = async ({
  socket,
  taskOrder,
  targetColumnId,
  taskId,
  newOrder
}: TaskDataExtended) => {
  if (targetColumnId && taskId) {
    await prisma.task.update({
      where: { id: taskId },
      data: {
        columnId: targetColumnId
      }
    });
  }

  await Promise.all(
    taskOrder.map(async (task) => {
      return await prisma.task.update({
        where: { id: task.id },
        data: {
          order: task.order
        }
      });
    })
  );

  return socket.to(socket.room ?? '').emit('new-order', newOrder);
};

export const addColumnData = async ({ socket, columns }: AddColumnDataExtended) => {
  return socket.to(socket.room ?? '').emit('new-order', columns);
};

export const updateColumnOrder = async ({
  socket,
  columnOrder,
  newColumnOrder
}: UpdateColumnDataExtended) => {
  await Promise.all(
    columnOrder.map(async (column) => {
      return await prisma.column.update({
        where: { id: column.id },
        data: {
          order: column.order
        }
      });
    })
  );
  return socket.nsp.to(socket.room ?? '').emit('new-order', newColumnOrder);
};
