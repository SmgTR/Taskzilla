import { path, Workspace } from '@/pages/api/secure/workspace/createWorkspace';
import { postPromise } from '../../basePromises';

export async function createWorkspace(payload: Workspace): Promise<Workspace> {
  return postPromise(path, payload);
}
