import { Namespace, RemoteSocket, Server, Socket as SocketIO } from 'socket.io';

import { ProjectActiveUsersSocket } from '@/pages/api/socket';

const listOfUsersHandler = (socketsList: RemoteSocket<any, any>[]) => {
  const listOfAllUsers = socketsList.map((socket: any) => socket.user);
  const connectedUsers = listOfAllUsers.filter(
    (arrUser, index) =>
      listOfAllUsers.findIndex((currentUser) => arrUser.email === currentUser.email) === index
  );
  return connectedUsers;
};

const getAllSocketsInRoomHandler = async (socketInstance: Namespace, roomName: string) => {
  const socketsList = await socketInstance.in(roomName).fetchSockets();
  if (socketsList) {
    return socketsList.map((socket: RemoteSocket<any, any>) => socket);
  } else {
    return undefined;
  }
};

export const connectUser = async (
  roomName: string,
  user: ActiveUserData,
  socket: ProjectActiveUsersSocket,
  socketInstance: Namespace
) => {
  socket.join(roomName);
  socket.user = user;
  socket.room = roomName;

  const socketsList = await getAllSocketsInRoomHandler(socketInstance, roomName);
  if (socketsList) {
    const connectedUsers = listOfUsersHandler(socketsList);

    return socket.nsp.to(roomName).emit('connected-users', connectedUsers);
  }
  return;
};

export const disconnectUser = async (
  roomName: string,
  user: ActiveUserData | null,
  socket: ProjectActiveUsersSocket,
  socketInstance: Namespace
) => {
  if (user) socket.user = user;

  const socketsList = await getAllSocketsInRoomHandler(socketInstance, roomName ?? socket.room);
  if (socketsList) {
    const connectedUsers = listOfUsersHandler(socketsList);
    const lastConnectedSocket = connectedUsers.filter((user) => {
      if (user.email === socket.user?.email) return user;
    });
    if (lastConnectedSocket.length <= 1) {
      const index = connectedUsers.findIndex((user) => user.email === socket.user?.email);
      connectedUsers.splice(index, 1);

      socket.to(roomName ?? socket.room).emit('disconnected-users', connectedUsers);
    }
  }
  socket.leave(roomName ?? socket.room);
};
