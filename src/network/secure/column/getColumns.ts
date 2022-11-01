import { ColumnResponse, path } from '@/pages/api/secure/column/allProjectColumns/[projectId]';
import { getPromise } from '@/src/network/basePromises';

export async function getColumns(id: string): Promise<ColumnResponse> {
  return getPromise(`${path}/${id}`);
}
