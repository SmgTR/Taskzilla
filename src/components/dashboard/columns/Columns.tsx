import { useColumnsContext } from '@/src/context/ColumnsContext';
import { useProjectContext } from '@/src/context/ProjectContext';
import { createColumn } from '@/src/network/secure/column/createColumn';
import { NextPage } from 'next';
import PrimaryButton from '@/components/ui/buttons/PrimaryButton';
import ColumnItem from './ColumnItem';

import styles from './Columns.module.scss';

interface Props {
  projectId: string;
}

const Columns: NextPage<Props> = ({ projectId }) => {
  const projectColumns = useColumnsContext();

  const addColumnHandler = async () => {
    const newColumn = await createColumn({
      name: 'new Column',
      projectId
    });

    if (newColumn) {
      projectColumns.updateColumns(newColumn);
    }
  };
  if (projectColumns.loading) return <p>Loading...</p>;

  if (projectColumns.columns && projectColumns.columns?.length > 0) {
    return (
      <div className={styles.columnsContainer}>
        <ul className={styles.columnsList}>
          {projectColumns.columns.map((column) => {
            return <ColumnItem column={column} projectId={projectId} key={column.id} />;
          })}
          <li>
            <PrimaryButton
              btnType="button"
              btnText="Add Column"
              title="Add Column"
              onClickHandler={addColumnHandler}
            />
          </li>
        </ul>
      </div>
    );
  }
  return (
    <>
      <p>You dont have any columns yet</p>
      <PrimaryButton
        btnType="button"
        btnText="Add Column"
        title="Add Column"
        onClickHandler={addColumnHandler}
      />
    </>
  );
};

export default Columns;
