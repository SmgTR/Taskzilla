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
  };
}
