import { NotificationsUser } from '@/api/socket/index';
import { prisma } from 'prisma/prisma';
import { Namespace, RemoteSocket } from 'socket.io';

export const notificationsConnectUser = async (socket: NotificationsUser, user: ActiveUserData) => {
  return (socket.user = user);
};

export const sendNotificationToUser = async (
  socket: NotificationsUser,
  socketInstance: Namespace,
  receiverEmail: string
) => {
  const socketsList = await (
    await socketInstance.fetchSockets()
  ).map((socket: any) => {
    return {
      socketId: socket.id,
      user: socket.user
    };
  });

  const updatedNotifications = await prisma.notification.findMany({
    where: {
      userId: socket?.user?.id
    },
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      invitation: {
        include: {
          user: {
            select: {
              name: true,
              lastName: true
            }
          },
          project: {
            select: {
              name: true
            }
          }
        }
      }
    }
  });

  socketsList.filter((userSocket: any) => {
    if (userSocket.user && userSocket.user.email === receiverEmail) {
      return socket.to(userSocket.socketId).emit('get-notification', updatedNotifications);
    }
  });
};
