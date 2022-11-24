import { NextPage } from 'next';

import styles from './TaskItem.module.scss';

interface Props {
  name: string;
}

const TaskItem: NextPage<Props> = ({ name }) => {
  return <li className={styles.taskItem}>{name}</li>;
};

export default TaskItem;
