import { path, NotificationsResponse } from '@/api/secure/notifications/getAllNotifications';
import { getPromise } from '@/src/network/basePromises';

export async function getAllNotifications(): Promise<NotificationsResponse[]> {
  return getPromise(path);
}
