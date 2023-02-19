import { NextApiRequest } from 'next';
import { Server, ServerOptions } from 'socket.io';

import { connectUser, disconnectUser } from '@/src/utils/socket/activeUsersSocketHelper';
import {
  notificationsConnectUser,
  sendNotificationToUser
} from '@/src/utils/socket/notificationsSocketHelper';
import {
  addColumn,
  connectColumnSocket,
  updateColumn,
  updateTask
} from '@/src/utils/socket/updateColumnDataHelper';

import {
  SocketNextApiResponse,
  ProjectActiveUsersSocket,
  TaskData,
  NotificationsUser
} from '@/types/SocketTypes';

const socketHandler = async (req: NextApiRequest, res: SocketNextApiResponse) => {
  if (res.socket.server?.io) {
    res.end();
    return;
  }

  const io = new Server(res.socket.server as Partial<ServerOptions>);
  res.socket.server.io = io;

  const activeProjectUsers = io.of('/projectActiveUsers');

  activeProjectUsers.on('connection', async (socket: ProjectActiveUsersSocket) => {
    socket.on('connect-user', async (roomName: string, user) => {
      connectUser(roomName, user, socket, activeProjectUsers);
    });

    socket.on('disconnect-user', async (roomName, user) => {
      disconnectUser(roomName, user, socket, activeProjectUsers);
    });

    socket.on('disconnecting', async () => {
      disconnectUser(socket.room ?? '', null, socket, activeProjectUsers);
    });
  });

  const columnAndTasksUpdate = io.of('/updateColumnTaskContent');

  columnAndTasksUpdate.on('connection', async (socket: ProjectActiveUsersSocket) => {
    socket.on('connect-to-room', async (roomName) => {
      connectColumnSocket(socket, roomName);
    });

    socket.on('update-task', async ({ taskOrder, targetColumnId, taskId, newOrder }: TaskData) => {
      updateTask({ socket, taskOrder, targetColumnId, taskId, newOrder });
    });

    socket.on('update-column', async ({ columnOrder, newColumnOrder }) => {
      updateColumn({ socket, columnOrder, newColumnOrder });
    });

    socket.on('add-column', async (columns) => {
      addColumn({ socket, columns });
    });
  });

  const notifications = io.of('/notifications');

  notifications.on('connection', async (notificationSocket: NotificationsUser) => {
    notificationSocket.on('connect-notification', async (user) => {
      notificationsConnectUser(notificationSocket, user);
    });

    notificationSocket.on('send-notification', async (receiverEmail) => {
      sendNotificationToUser(notificationSocket, notifications, receiverEmail);
    });
  });

  res.end();
};

export default socketHandler;
