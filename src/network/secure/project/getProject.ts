import { path, ProjectResponse } from '@/pages/api/secure/project/getProject/[projectId]';
import { getPromise } from '@/src/network/basePromises';

export async function getProject(id?: string): Promise<ProjectResponse> {
  return getPromise(`${path}/${id}`);
}
