import { WorkspacesResponse, path } from '@/pages/api/secure/workspace/getAllWorkspaces';
import { getPromise } from '@/src/network/basePromises';

export async function getWorkspaces(): Promise<WorkspacesResponse> {
  return getPromise(path);
}
