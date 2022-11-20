import { postPromise } from '../basePromises';

export async function createNewUser(payload: any) {
  return postPromise('/api/user/createUser', payload);
}
