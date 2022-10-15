import { path, ProjectRequest } from '@/pages/api/secure/project/createProject';
import { postPromise } from '../../basePromises';

export async function createProject(payload: ProjectRequest): Promise<Project> {
  return postPromise(path, payload);
}
