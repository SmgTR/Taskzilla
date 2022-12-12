export {};
import { DOMAttributes } from 'react';

declare global {
  type NextApiError = { error: string };

  type Workspace = {
    name: string;
    owner: string;
    id: string;
    projects: Project[];
    workspaceMember?: workspaceMember[];
  };

  type workspaceMember = {
    role: String;
    memberId: String;
    workspaceId: String;
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

  type ActiveUserData = {
    email: string;
    name: string;
    id: string;
    image?: string;
  };

  type Task = {
    id?: string;
    name: string;
    assignedTo?: [];
    dueDate: Date | null;
    availableTime: number | null;
    description: string | null;
    columnId: string;
    createdAt: Date | null;
    updatedAt?: Date;
    Attachments?: [];
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

declare module 'react' {
  interface Attributes {
    innerRef?: any;
  }
}
