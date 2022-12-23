import { connectUser, disconnectUser } from '@/src/utils/socket/activeUsersSocketHelper';
import {
  notificationsConnectUser,
  sendNotificationToUser
} from '@/src/utils/socket/notificiationsSocketHelper';
import {
  connectColumnSocket,
  updateColumn,
  updateTask
} from '@/src/utils/socket/updateColumnDataHelper';
import { Socket } from 'net';
import { NextApiRequest, NextApiResponse } from 'next';

import { Server, ServerOptions, Socket as SocketIO } from 'socket.io';

interface SocketNextApiResponse extends NextApiResponse {
  socket: ExtendedSocket;
}

interface ExtendedSocket extends Socket {
  server: Partial<ServerOptions> & SocketServer;
}

export interface ProjectActiveUsersSocket extends SocketIO {
  user?: {
    email: string;
    name: string;
    id: string;
    image?: string;
  };
  room?: string;
  id: string;
}

export interface NotificationsUser extends SocketIO {
  user?: {
    email: string;
    id: string;
  };
}

type SocketServer = {
  io: Server;
};

export interface TaskData {
  taskOrder: { id: string; order: number }[];
  targetColumnId?: string;
  taskId?: string;
  newOrder: Column[];
}

export interface ColumnData {
  columnOrder: { id: string; order: number }[];
  newColumnOrder: Column[];
}

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
