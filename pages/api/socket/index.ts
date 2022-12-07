import { Socket } from 'net';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'prisma/prisma';

import { RemoteSocket, Server, ServerOptions, Socket as SocketIO } from 'socket.io';

interface SocketNextApiResponse extends NextApiResponse {
  socket: ExtendedSocket;
}

interface ExtendedSocket extends Socket {
  server: Partial<ServerOptions> & SocketServer;
}

interface ProjectActiveUsersSocket extends SocketIO {
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

export type TaskData = {
  taskOrder: { id: string; order: number }[];
  targetColumnId?: string;
  taskId?: string;
  newOrder: Column[];
};

const socketHandler = async (req: NextApiRequest, res: SocketNextApiResponse) => {
  if (res.socket.server?.io) {
    res.end();
    return;
  }

  const listOfUsersHandler = (socketsList: RemoteSocket<any, any>[]) => {
    const listOfAllUsers = socketsList.map((socket: any) => socket.user);
    const connectedUsers = listOfAllUsers.filter(
      (arrUser, index) =>
        listOfAllUsers.findIndex((currentUser) => arrUser.email === currentUser.email) === index
    );
    return connectedUsers;
  };

  const getAllSocketsInRoomHandler = async (roomName: string) => {
    const socketsList = await io.of('/projectActiveUsers').in(roomName).fetchSockets();
    if (socketsList) {
      return socketsList.map((socket) => socket);
    } else {
      return undefined;
    }
  };

  const io = new Server(res.socket.server as Partial<ServerOptions>);
  res.socket.server.io = io;

  const activeProjectUsers = io.of('/projectActiveUsers');

  activeProjectUsers.on('connection', async (socket: ProjectActiveUsersSocket) => {
    socket.on('connect-user', async (roomName: string, user) => {
      socket.join(roomName);
      socket.user = user;
      socket.room = roomName;
      const socketsList = await getAllSocketsInRoomHandler(roomName);
      if (socketsList) {
        const connectedUsers = listOfUsersHandler(socketsList);
        return socket.nsp.to(roomName).emit('connected-users', connectedUsers);
      }
      return;
    });

    socket.on('disconnecting', async () => {
      const socketsList = await getAllSocketsInRoomHandler(socket.room ?? 'room1');
      if (socketsList) {
        const connectedUsers = listOfUsersHandler(socketsList);
        const lastConnectedSocket = connectedUsers.filter((user) => {
          if (user.email === socket.user?.email) return user;
        });
        if (lastConnectedSocket.length <= 1) {
          const index = connectedUsers.findIndex((user) => user.email === socket.user?.email);
          connectedUsers.splice(index, 1);
          socket.nsp.to(socket.room ?? 'room1').emit('connected-users', connectedUsers);
        }
      }
    });
  });

  const columnAndTasksUpdate = io.of('/updateColumnTaskContent');

  columnAndTasksUpdate.on('connection', async (socket: ProjectActiveUsersSocket) => {
    socket.on('connect-to-room', async (roomName) => {
      socket.join(roomName);
      socket.room = roomName;
    });

    socket.on('update-task', async ({ taskOrder, targetColumnId, taskId, newOrder }: TaskData) => {
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
    });
  });

  res.end();
};

export default socketHandler;
