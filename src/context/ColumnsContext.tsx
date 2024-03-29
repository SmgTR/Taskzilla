import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { getColumns } from '../network/secure/column/getColumns';

interface ColumnContext {
  columns: Column[] | undefined;
  loading: boolean;
  error: Error | null;
  updateColumns: (column: Column) => void;
  addTask: (task: Task, columnId: string) => void;
  updateTask: (taskId: string, taskData: TaskData) => void;
  getTasksLength: (columnId: string) => number;
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
    columns: [] as Column[],
    loading: true,
    error: null
  });

  function updateColumns(column: Column) {
    setProjectColumns((prevState) => {
      return { ...prevState, columns: [...prevState.columns, column] };
    });
  }

  function addTask(task: Task, columnId: string) {
    setProjectColumns((prevState) => {
      const column = prevState.columns.find((column) => column.id === columnId);

      if (column && !column.Task) {
        column.Task = [task];
      } else {
        column?.Task?.push(task);
      }

      return { ...prevState, column };
    });
  }

  function getTasksLength(columnId: string) {
    const column = projectColumns.columns.find((column) => {
      if (column.id === columnId) {
        return column;
      }
    });
    return column?.Task?.length ?? 0;
  }

  function updateTask(taskId: string, taskData: TaskData) {
    console.log(taskId, taskData);
  }

  useEffect(() => {
    const projectColumns = async () => {
      const responseColumns = await getColumns(props.projectId).then((data) =>
        JSON.parse(JSON.stringify(data))
      );

      setProjectColumns((prevState) => {
        return { ...prevState, loading: false, columns: responseColumns[0].Column };
      });
    };

    projectColumns();
  }, [props.projectId]);

  return (
    <>
      <ColumnsContext.Provider
        value={{ ...projectColumns, updateColumns, addTask, updateTask, getTasksLength }}
      >
        {children}
      </ColumnsContext.Provider>
    </>
  );
}
