import { WorkspacesResponse } from '@/pages/api/secure/workspace/getAllWorkspaces';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { getWorkspaces } from '../network/secure/workspace/getAllWorkspaces';

const workspacesDefaultValues = {} as WorkspacesResponse;
const WorkspaceContext = createContext<WorkspacesResponse>(workspacesDefaultValues);

export function useWorkspacesContext() {
  return useContext(WorkspaceContext);
}

type Props = {
  children: ReactNode;
};

export function WorkspaceProvider({ children }: Props) {
  const [userWorkspaces, setUserWorkspaces] = useState({} as WorkspacesResponse);

  useEffect(() => {
    const getAll = async () => {
      const workspaces = await getWorkspaces();
      setUserWorkspaces(workspaces);
    };

    getAll();
  }, []);

  return (
    <>
      <WorkspaceContext.Provider value={userWorkspaces}>{children}</WorkspaceContext.Provider>
    </>
  );
}
