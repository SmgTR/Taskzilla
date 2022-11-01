import { ColumnRequest, path, Column } from '@/pages/api/secure/column/createColumn';
import { postPromise } from '../../basePromises';

export async function createColumn(payload: ColumnRequest): Promise<Column> {
  return postPromise(path, payload);
}
