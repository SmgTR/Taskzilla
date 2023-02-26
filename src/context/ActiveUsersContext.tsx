import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  Component,
  createContext,
  Dispatch,
  ReactNode,
  Reducer,
  useContext,
  useReducer
} from 'react';
import { AnyAction } from 'redux';

export interface ActiveUser {
  email: string;
  name: string;
  id: string;
  image: string;
  lastName: string;
}

interface ActiveUsersContextData {
  activeUsers: ActiveUser[];
}

const DefaultActiveUsersContextData: ActiveUsersContextData = {
  activeUsers: []
};

type Props = {
  children: ReactNode;
};

type ActiveUsersContextType = [ActiveUsersContextData, Dispatch<AnyAction>];

/* ------------------------REDUX------------------------ */
const activeUsersSlice = createSlice({
  name: 'ActiveUsers',
  reducers: {
    setActiveUsers: (state, action: PayloadAction<{ activeUsers: ActiveUser[] }>) => {
      state.activeUsers = action.payload.activeUsers;
    }
  },
  initialState: DefaultActiveUsersContextData
});
export const { setActiveUsers } = activeUsersSlice.actions;

/* ------------------------CONTEXT------------------------ */
export const ActiveUsersContext = createContext<ActiveUsersContextType>([
  DefaultActiveUsersContextData,
  () => null
]);

export const ActiveUsersProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer<Reducer<ActiveUsersContextData, AnyAction>>(
    activeUsersSlice.reducer,
    DefaultActiveUsersContextData
  );

  return (
    <ActiveUsersContext.Provider value={[state, dispatch]}>{children}</ActiveUsersContext.Provider>
  );
};

export function useActiveUsersContext(): ActiveUsersContextType {
  return useContext(ActiveUsersContext);
}
