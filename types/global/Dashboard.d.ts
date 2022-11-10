export {};

declare global {
  type NextApiError = { error: string };

  type Workspace = {
    name: string;
    owner: string;
    id: string;
    projects: Project[];
  };

  type WorkspaceUpdate = {
    name: string;
    owner: string;
    id: string;
  };

  type Project = {
    id?: string;
    name: string;
    owner: string;
    createdAt: Date;
    projectMembers?: [];
    workspaceId?: string;
    Column?: Column[];
  };

  type Task = {
    id?: string;
    name: string;
    assignedTo?: [];
    dueDate?: Date;
    availableTime?: number;
    description?: string;
    columnId: string;
    createdAt?: Date;
    updatedAt?: Date;
    Attachments: [];
  };

  type TaskData = {
    id?: string;
    name?: string;
    assignedTo?: [];
    dueDate?: Date;
    availableTime?: number;
    description?: string;
    columnId?: string;
    createdAt?: Date;
    updatedAt?: Date;
    Attachments?: [];
  };

  type Column = {
    id?: string;
    name: string;
    projectId: string;
    Task?: Task[];
  };
}
