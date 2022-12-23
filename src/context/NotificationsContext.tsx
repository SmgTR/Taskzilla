import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createContext,
  Dispatch,
  ReactNode,
  Reducer,
  useContext,
  useEffect,
  useReducer
} from 'react';
import { AnyAction } from 'redux';
import { getAllNotifications } from '../network/secure/notifications/getAllNotifications';
import { getUnreadNotifications } from '../network/secure/notifications/getUnreadNotifications';

interface NotificationsContextData {
  unreadMessages: number;
  notifications: NotificationData[];
}

const DefaultNotificationsContextData: NotificationsContextData = {
  unreadMessages: 0,
  notifications: []
};

type Props = {
  children: ReactNode;
  notifications?: NotificationData[];
};

type NotificationsContextType = [NotificationsContextData, Dispatch<AnyAction>];

/* ------------------------REDUX------------------------ */
const notificationsSlice = createSlice({
  name: 'Notifications',
  reducers: {
    addNewNotification: (state) => {
      state.unreadMessages = state.unreadMessages++;
    },
    setUnreadMessages: (state, action: PayloadAction<number>) => {
      state.unreadMessages = action.payload;
    },
    setNotificationsData: (state, action: PayloadAction<NotificationData[]>) => {
      state.notifications = [...action.payload];
    },
    updateNotification: (state, action: PayloadAction<string>) => {
      const notificationIndex = state.notifications.findIndex(
        (notification) => notification.id === action.payload
      );
      state.notifications[notificationIndex].invitation.active = false;
    }
  },
  initialState: DefaultNotificationsContextData
});
export const { addNewNotification, setUnreadMessages, setNotificationsData, updateNotification } =
  notificationsSlice.actions;

/* ------------------------CONTEXT------------------------ */
export const NotificationsContext = createContext<NotificationsContextType>([
  DefaultNotificationsContextData,
  () => null
]);

export const NotificationsContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer<Reducer<NotificationsContextData, AnyAction>>(
    notificationsSlice.reducer,
    DefaultNotificationsContextData
  );

  useEffect(() => {
    const getNotifications = async () => {
      const notifications = (await getAllNotifications()) as NotificationData[];

      if (notifications) {
        const unreadMessages = notifications.filter((notification) => notification.read === false);
        dispatch(setUnreadMessages(unreadMessages.length ?? 0));
        dispatch(setNotificationsData(notifications));
      }
    };

    getNotifications();
  }, []);

  return (
    <NotificationsContext.Provider value={[state, dispatch]}>
      {children}
    </NotificationsContext.Provider>
  );
};

export function useNotificationsContext(): NotificationsContextType {
  return useContext(NotificationsContext);
}
