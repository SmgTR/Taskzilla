import { prisma } from 'prisma/prisma';

import { ProjectActiveUsersSocket, TaskData } from '@/pages/api/socket';
interface TaskDataExtended extends TaskData {
  socket: ProjectActiveUsersSocket;
}

export const connectColumnSocket = (socket: ProjectActiveUsersSocket, roomName: string) => {
  socket.join(roomName);
  socket.room = roomName;
};

export const updateTask = async ({
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

  return socket.to(socket.room ?? '').emit('new-task-order', newOrder);
};
