import { TaskRequest, path } from '@/pages/api/secure/task/updateTask';
import { postPromise } from '../../basePromises';

export async function editTask(payload: TaskRequest): Promise<Task> {
  return postPromise(path, payload);
}
