import { connectUser, disconnectUser } from '@/src/utils/socket/activeUsersSocketHelper';
import { connectColumnSocket, updateTask } from '@/src/utils/socket/updateColumnDataHelper';
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

type SocketServer = {
  io: Server;
};

export interface TaskData {
  taskOrder: { id: string; order: number }[];
  targetColumnId?: string;
  taskId?: string;
  newOrder: Column[];
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
      disconnectUser('', null, socket, activeProjectUsers);
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
  });

  res.end();
};

export default socketHandler;
