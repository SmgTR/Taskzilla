import { useColumnsContext } from '@/src/context/ColumnsContext';
import { NextPage } from 'next';

interface Props {}

const Columns: NextPage<Props> = () => {
  const columns = useColumnsContext();
  if (columns.loading) return <p>Loading...</p>;

  if (columns.projectColumns) {
    return (
      <ul>
        {columns.projectColumns.map((column) => {
          return <li key={column.id}>{column.name}</li>;
        })}
      </ul>
    );
  }
  return <p>You dont have any columns yet</p>;
};

export default Columns;
