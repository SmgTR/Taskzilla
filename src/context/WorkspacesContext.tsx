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

type WorkspaceContextType = [WorkspaceContextData, Dispatch<AnyAction>];

type Props = {
  children: ReactNode;
  memberIn: Workspace[];
  guestIn: Workspace[];
};

interface WorkspaceContextData {
  memberIn: Workspace[];
  guestIn: Workspace[];
}

const DefaultWorkspaceContextData: WorkspaceContextData = {
  memberIn: [],
  guestIn: []
};

// REDUX
const currentWorkspaceSlice = createSlice({
  name: 'Workspace',
  reducers: {
    setNewState: (state, action: PayloadAction<WorkspaceContextData>) => {
      state.memberIn = action.payload.memberIn;
      state.guestIn = action.payload.guestIn;
    },
    addWorkspaceProject: (state, action: PayloadAction<Project>) => {
      state.memberIn.find((workspace) => {
        if (workspace.id === action.payload.workspaceId) {
          if (workspace.projects && workspace.projects.length > 0)
            workspace.projects = [...workspace.projects, action.payload];
          else {
            workspace.projects = [action.payload];
          }
        }
      });
    },
    addWorkspace: (state, action: PayloadAction<any>) => {
      state.memberIn = [...state.memberIn, action.payload];
    }
  },
  initialState: DefaultWorkspaceContextData
});

export const { setNewState, addWorkspaceProject, addWorkspace } = currentWorkspaceSlice.actions;

const WorkspaceContext = createContext<WorkspaceContextType>([
  DefaultWorkspaceContextData,
  () => null
]);

export function WorkspaceProvider({ children, ...props }: Props) {
  const [state, dispatch] = useReducer<Reducer<WorkspaceContextData, AnyAction>>(
    currentWorkspaceSlice.reducer,
    {
      memberIn: props.memberIn,
      guestIn: props.guestIn
    }
  );

  useEffect(() => {
    dispatch(setNewState({ memberIn: [...props.memberIn], guestIn: [...props.guestIn] }));
  }, [props.memberIn, props.guestIn]);

  return (
    <>
      <WorkspaceContext.Provider value={[state, dispatch]}>{children}</WorkspaceContext.Provider>
    </>
  );
}

export function useWorkspacesContext(): WorkspaceContextType {
  return useContext(WorkspaceContext);
}
