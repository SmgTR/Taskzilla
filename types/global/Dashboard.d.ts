export {};
import { DOMAttributes } from 'react';

declare global {
  type NextApiError = { error: string };

  type NextApiMsg = { message: string };

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
    workspace?: Workspace;
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

  type NotificationData = {
    id: string;
    userId: string;
    userInvite: string;
    read: boolean;
    type: 'INVITATION';
    invitation: InvitationData;
    createdAt: Date;
  };
}

type InvitationData = {
  active: boolean;
  createdAt: Date;
  id: string;
  invitationHost: string;
  projectId: string;
  receiverEmail: string;
  user: User;
  project: {
    name: string;
  };
};

declare module 'react' {
  interface Attributes {
    innerRef?: any;
  }
}

declare module 'react' {
  interface Attributes {
    innerRef?: any;
  }
}
