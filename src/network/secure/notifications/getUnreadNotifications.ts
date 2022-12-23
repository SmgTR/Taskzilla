import { path, NotificationsResponse } from '@/api/secure/notifications/getUnreadNotifications';
import { getPromise } from '@/src/network/basePromises';

export async function getUnreadNotifications(): Promise<NotificationsResponse[]> {
  return getPromise(path);
}
