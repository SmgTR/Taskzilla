import { TaskRequest, path } from '@/pages/api/secure/task/removeTask';
import { postPromise } from '../../basePromises';

export async function deleteTask(payload: TaskRequest): Promise<Task> {
  return postPromise(path, payload);
}
