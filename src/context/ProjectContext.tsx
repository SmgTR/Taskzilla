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

type ProjectContextType = [ProjectContextData, Dispatch<AnyAction>];

type Props = {
  project: Project;
  children: ReactNode;
};

interface ProjectContextData {
  id?: string;
  name: string;
  owner: string;
  createdAt: Date;
  projectMembers?: [];
}

const DefaultProjectContextData: ProjectContextData = {
  id: '',
  name: '',
  owner: '',
  createdAt: new Date(),
  projectMembers: []
};

// REDUX
const currentProjectSlice = createSlice({
  name: 'project',
  reducers: {
    setNewState: (state, action: PayloadAction<{ project: Project }>) => {
      state = { ...action.payload.project };
    }
  },
  initialState: DefaultProjectContextData
});

export const { setNewState } = currentProjectSlice.actions;

const ProjectContext = createContext<ProjectContextType>([DefaultProjectContextData, () => null]);

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'set':
      return (state = action.payload);
  }
}

export function ProjectProvider({ children, ...props }: Props) {
  const [state, dispatch] = useReducer<Reducer<ProjectContextData, AnyAction>>(reducer, {
    id: props.project.id,
    name: props.project.name,
    owner: props.project.owner,
    createdAt: props.project.createdAt,
    projectMembers: props.project.projectMembers
  });

  useEffect(() => {
    dispatch(setNewState({ project: props.project }));
    dispatch({ type: 'set', payload: props.project });
  }, [props.project, state]);
  return (
    <>
      <ProjectContext.Provider value={[state, dispatch]}>{children}</ProjectContext.Provider>
    </>
  );
}

export function useProjectContext(): ProjectContextType {
  return useContext(ProjectContext);
}
