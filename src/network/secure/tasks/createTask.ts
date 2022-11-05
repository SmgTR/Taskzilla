import { TaskRequest, path } from '@/pages/api/secure/task/createTask';
import { postPromise } from '../../basePromises';

export async function createTask(payload: TaskRequest): Promise<Task> {
  return postPromise(path, payload);
}
