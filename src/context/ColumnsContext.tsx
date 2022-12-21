import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { getColumns } from '../network/secure/column/getColumns';

interface ColumnContext {
  columns: Column[] | undefined;
  loading: boolean;
  error: Error | null;
  updateColumns: (column: Column) => void;
  addTask: (task: Task, columnId: string) => void;
  updateTask: (taskId: string, columnId: string) => void;
  getTasksLength: (columnId: string) => number;
  removeTask: (task: Task, index: number, taskId: string, columnId: string) => void;
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
    setProjectColumns((state) => {
      state.columns.find((column) => {
        if (column.id === columnId && column.Task) {
          column.Task.push(task);
        }

        if (column.id === columnId && !column.Task) {
          column.Task = [task];
        }
      });
      return { ...state };
    });
  }
  function removeTask(task: Task, index: number, taskId: string, columnId: string) {
    setProjectColumns((state) => {
      state.columns.find((column) => {
        if (column.id === columnId && column.Task) {
          column.Task.splice(index, 1);
        }
      });
      console.log({ ...state }, task);
      return { ...state };
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

  function updateTask(taskId: string) {
    console.log(taskId);
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
        value={{
          ...projectColumns,
          updateColumns,
          addTask,
          updateTask,
          getTasksLength,
          removeTask
        }}
      >
        {children}
      </ColumnsContext.Provider>
    </>
  );
}
