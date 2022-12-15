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
import { getUnreadNotifications } from '../network/secure/notifications/getUnreadNotifications';

interface NotificationsContextData {
  unreadMessages: number;
}

const DefaultNotificationsContextData: NotificationsContextData = {
  unreadMessages: 0
};

type Props = {
  children: ReactNode;
};

type NotificationsContextType = [NotificationsContextData, Dispatch<AnyAction>];

/* ------------------------REDUX------------------------ */
const notificationsSlice = createSlice({
  name: 'Notifications',
  reducers: {
    addNewNotification: (state, action: PayloadAction) => {
      state.unreadMessages = state.unreadMessages++;
    },
    setNotifications: (state, action: PayloadAction<number>) => {
      state.unreadMessages = action.payload;
    }
  },
  initialState: DefaultNotificationsContextData
});
export const { addNewNotification, setNotifications } = notificationsSlice.actions;

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
    const unreadNotifications = async () => {
      const notifications = await getUnreadNotifications();
      return dispatch(setNotifications(notifications?.length ?? 0));
    };

    unreadNotifications();
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
