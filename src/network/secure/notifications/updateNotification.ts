import { path } from '@/api/secure/notifications/updateNotifications';
import { getPromise } from '@/src/network/basePromises';

export async function updateNotifications() {
  return getPromise(path);
}
