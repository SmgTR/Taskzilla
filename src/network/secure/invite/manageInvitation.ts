import { path, ProjectUpdateData } from '@/pages/api/secure/invitation/manageInvitation';
import { postPromise } from '../../basePromises';

export async function manageInvitation(payload: ProjectUpdateData): Promise<Project> {
  return postPromise(path, payload);
}
