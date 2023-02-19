import { Socket } from 'net';
import { Server, ServerOptions, Socket as SocketIO } from 'socket.io';
import { NextApiResponse } from 'next';

export interface TaskDataExtended extends TaskData {
  socket: ProjectActiveUsersSocket;
}

export interface UpdateColumnDataExtended extends UpdateColumnData {
  socket: ProjectActiveUsersSocket;
}

export interface AddColumnDataExtended extends AddColumnData {
  socket: ProjectActiveUsersSocket;
}

export interface SocketNextApiResponse extends NextApiResponse {
  socket: ExtendedSocket;
}

export interface ExtendedSocket extends Socket {
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

export interface UpdateColumnData {
  columnOrder: { id: string; order: number }[];
  newColumnOrder: Column[];
}

export interface AddColumnData {
  columns: Column[];
}
