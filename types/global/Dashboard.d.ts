export {};

declare global {
  type NextApiError = { error: string };

  type Workspace = {
    name: string;
    owner: string;
    id: string;
    projects: Project[];
  };

  type Project = {
    id?: string;
    name: string;
    owner: string;
    createdAt: Date;
    projectMembers?: [];
    workspaceId?: string;
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

  type Column = {
    id?: string;
    name: string;
    projectId: string;
    Task?: Task[];
  };
}
