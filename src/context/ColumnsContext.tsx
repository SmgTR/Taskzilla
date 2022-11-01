import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { getColumns } from '../network/secure/column/getColumns';

interface ColumnContext {
  projectColumns: Column[] | undefined;
  loading: boolean;
  error: Error | null;
}

const columnsDefaultValues = {} as ColumnContext;
const ColumnsContext = createContext<ColumnContext>(columnsDefaultValues);

export function useColumnsContext() {
  return useContext(ColumnsContext);
}

type Props = {
  children: ReactNode;
  projectId: string;
};

export function ColumnsProvider({ children, ...props }: Props) {
  const [projectColumns, setProjectColumns] = useState({
    projectColumns: [],
    loading: true,
    error: null
  });

  useEffect(() => {
    const projectColumns = async () => {
      const responseColumns = await getColumns(props.projectId).then((data) =>
        JSON.parse(JSON.stringify(data))
      );
      setProjectColumns((prevState) => {
        return { ...prevState, loading: false, projectColumns: responseColumns[0].Column };
      });
    };

    projectColumns();
  }, [props.projectId]);

  return (
    <>
      <ColumnsContext.Provider value={projectColumns}>{children}</ColumnsContext.Provider>
    </>
  );
}
